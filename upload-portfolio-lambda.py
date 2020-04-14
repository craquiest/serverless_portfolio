# coding: utf-8
import boto3
import io
import zipfile
import mimetypes

session = boto3.session.Session(profile_name='craquiest')
s3 = session.resource('s3')

portfolio_bucket = s3.Bucket('lamine.gayevi.com')
build_bucket = s3.Bucket('laminebuild.gayevi.com')

# portfolio_bucket.download_file('index.html', '/tmp/index.html')

# portfolio_zip = io.StringIO()
portfolio_zip = io.BytesIO()
build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)
    
with zipfile.ZipFile(portfolio_zip) as myzip:
    for nm in myzip.namelist():
        obj = myzip.open(nm)
        # print(f'{nm}: {mimetypes.guess_type(nm)[0]}')
        portfolio_bucket.upload_fileobj(obj, nm, ExtraArgs = {'ContentType':mimetypes.guess_type(nm)[0]})
        portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
        
