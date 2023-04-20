#!/bin/bash

# Test the gateway to see if it's working

curl --location --request POST 'https://xxx.lambda-url.us-west-2.on.aws/' \
--header 'Content-Type: application/json' \
--data-raw '
Here is some information about Google.  Create a financial model from this:

Below are our key financial results for the three months ended June 30, 2020 (consolidated unless otherwise noted):
•Revenues were $38.3 billion, a decrease of 2% year over year, constant currency revenues were flat year over year.
•Google segment revenues were $38.0 billion, a decrease of 2% year over year, and Other Bets revenues were $148 million, a decrease of 9% year over year.
•Revenues from the United States, EMEA, APAC, and Other Americas were $18.0 billion, $11.4 billion, $6.9 billion, and $1.8 billion, respectively.
•Cost of revenues was $18.6 billion, consisting of TAC of $6.7 billion and other cost of revenues of $11.9 billion. TAC as a percentage of advertising revenues ("TAC rate") was 22.4%.
•Operating expenses (excluding cost of revenues) were $13.4 billion.
•Income from operations was $6.4 billion.
•Other income (expense), net, was a gain of $1.9 billion.
•Effective tax rate was 15.9%.
•Net income was $7.0 billion with diluted net income per share of $10.13.
•Operating cash flow was $14.0 billion.
•Capital expenditures were $5.4 billion.
•Number of employees was 127,498 as of June 30, 2020. The majority of new hires during the quarter were engineers and product managers. By product area, the largest headcount additions were in Google Cloud and Search.
'
