# coding: utf-8
import boto3
import io
import zipfile
import mimetypes
import json

def lambda_handler(event, context):

    
    sns = boto3.resource('sns')  
    s3 = boto3.resource('s3')
    lmd = boto3.client('lambda')
    
    # topic = sns.Topic('arn:aws:sns:-----:------Topic')
    
    location = {
        "bucketName": 'laminebuild.gayevi.com',
        "objectKey": 'portfoliobuild.zip'
    }
    success_msg = "Portfolio deployed successfully!"
    fail_msg = "Portfolio was not deployed successfully!"
    lmd_data = { "Message" : success_msg}

    try:
        job = event.get("CodePipeline.job")

        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "BuildArtifact":
                    location = artifact["location"]["s3Location"]

        print("Building portfolio from " + str(location))

        portfolio_bucket = s3.Bucket('lamine.gayevi.com')
        build_bucket = s3.Bucket(location["bucketName"])

        # portfolio_zip = io.StringIO()
        portfolio_zip = io.BytesIO()
        build_bucket.download_fileobj(location["objectKey"], portfolio_zip)
            
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

        # topic.publish(Subject="Portfolio deployed", Message= success_msg)

        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job["id"])

    except:
        # topic.publish(Subject="Portfolio deploy failed", Message=fail_msg) 
        md_data["Message"] = fail_msg
        raise

    finally:
        lmd.invoke(FunctionName='notifon-notifier-dev-post-to-slack', Payload=json.dumps(lmd_data))
        return 'hello from Lambda: deployPortfolio'
    