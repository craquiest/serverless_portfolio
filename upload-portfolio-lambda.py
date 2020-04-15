# coding: utf-8
import boto3
import io
import zipfile
import mimetypes

def lambda_handler(event, context):


    s3 = boto3.resource('s3')
    
    # if locally and profile needed
    # session = boto3.session.Session(profile_name='craquiest')
    # s3 = session.resource('s3')

    portfolio_bucket = s3.Bucket('lamine.gayevi.com')
    build_bucket = s3.Bucket('laminebuild.gayevi.com')
    
    
    # portfolio_zip = io.StringIO()
    portfolio_zip = io.BytesIO()
    build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)
        
    with zipfile.ZipFile(portfolio_zip) as myzip:
        for nm in myzip.namelist():
            obj = myzip.open(nm)
            # print(f'{nm}: {mimetypes.guess_type(nm)[0]}')
            portfolio_bucket.upload_fileobj(obj, nm, ExtraArgs = {'ContentType':mimetypes.guess_type(nm)[0]})
            portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
    
    """
    if too much memory and want to download to disk instead
    build_bucket.download_file('portfolio.zip', '/tmp/portfolio.zip')
    with zipfile.ZipFile('/tmp/portfolio.zip') as myzip:
    for nm in myzip.namelist():
        obj = myzip.open(nm)
        portfolio_bucket.upload_fileobj(obj, nm, ExtraArgs = {'ContentType':mimetypes.guess_type(nm)[0]})
        portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
    """

    print("Job done!")

    return 'hello from Lambda'
    