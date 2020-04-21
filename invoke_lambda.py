# coding: utf-8
import boto3
import json

lmd = boto3.client('lambda')

#* invoke synchronously
# lmd.invoke(FunctionName='notifon-notifier-dev-post-to-slack')

#* invoke asynchronously with data
data= { "source":"ipython"}
lmd.invoke(FunctionName='notifon-notifier-dev-post-to-slack', Payload=json.dumps(data))
