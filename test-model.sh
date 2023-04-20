#!/bin/bash
# https://github.com/ddiu8081/chatgpt-demo/issues/289#issuecomment-1492799060
# OPENAI_API_KEY=sk-IIxxx

curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY" >openai-models-access-$(date +%Y%m%d-%H%M%S).json

