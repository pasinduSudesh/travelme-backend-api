import sys, os.path, io
sys.path.append('D:/home/python364x86/Lib/site-packages')
from textblob import TextBlob
import json


text = "Good place"
print(text)
sentiment = TextBlob(text).sentiment
print(sentiment)

# print("kkkkkfkfkf")

# with open('sentimentJson/reviewsForSentiment.json') as reviewsFile:
#     reviewData = json.load(reviewsFile)
#     print(reviewData)

# class SentimentAnalyse:

    
#     def readReviews():
#         with open('sentimentJson/reviewsForSentiment.json') as reviewsFile:
#             reviewData = json.load(reviewsFile)
#             print(reviewData)

def readReviews():
    with open('sentimentJson/reviewsForSentiment.json',encoding='utf-8') as reviewsFile:
        return json.load(reviewsFile)

def saveSentiment(file):
    with open('sentimentJson/sentimentResults.json', 'w') as json_file:
        json.dump(file, json_file)

def checkReview(review):
    if(len(review.strip()) == 0 ):
        return False
    else:
        return review.strip()

def analyse(review):
    sentiment = TextBlob(review).sentiment
    return sentiment

def getPresentage(total,count):
    return round((count/total)*100,2)

    
def sentimentAnalys(data):
    placesNames = []
    positive = []
    negative = []
    natural= []
    polarities = []
    subjectivities = []
    totalPolarities = []
    bestReviews = []
    totalReviewCounts= []
    for reviewsDet in data["reviews"]:
        totalReviews = 0
        totalPolarity = 0
        totalPositiveReviews = 0
        totalNegativeReviews = 0
        totalNaturalReviews = 0
        polarityArray = []
        subjectivityArray = []
        placesNames.append(reviewsDet["place"])
        maxPolarity = 0
        bestReview = None
        for review in reviewsDet["reviews"]:
            if(checkReview(review)):
                totalReviews += 1  #increased total review count by one                
                sentiment = analyse(review) #analyse
                polarity = sentiment[0]                
                polarityArray.append(sentiment[0])
                subjectivityArray.append(sentiment[1])
                totalPolarity += polarity

                #get best review***************************************
                if (polarity > maxPolarity):
                    maxPolarity = polarity
                    bestReview = review
                #get best review***************************************
                
                if(polarity > 0):
                    totalPositiveReviews += 1
                elif(polarity<0):
                    totalNegativeReviews += 1
                else:
                    totalNaturalReviews += 1
        
        positivePresentage = getPresentage(totalReviews,totalPositiveReviews)
        negativePresentage = getPresentage(totalReviews,totalNegativeReviews)
        naturalPresentage = getPresentage(totalReviews,totalNaturalReviews)

        positive.append(positivePresentage)
        negative.append(negativePresentage)
        natural.append(naturalPresentage)

        polarities.append(polarityArray)
        subjectivities.append(subjectivityArray)

        totalPolarities.append(totalPolarity)

        bestReviews.append(bestReview)
        totalReviewCounts.append(totalReviews)
    
    data = []
    
    for x in range(len(placesNames)):
        data.append({
            "placeName":placesNames[x],
            "positivePresentage":positivePresentage[x],
            "negativePresentage":negativePresentage[x],
            "naturalPresentage":naturalPresentage[x],
            "totalPolarity":totalPolarities[x],
            "totaoREviews":totalReviewCounts[x],
            "plarityis":polarities[x],
            "subjectivities":subjectivities[x]
            
        })
    
    analysedData = {"analyse":data}
    saveSentiment(analysedData)
    


sentimentAnalys(readReviews())



                







        


        

# SentimentAnalyse.readReviews()
#saveSentiment("ddd");
