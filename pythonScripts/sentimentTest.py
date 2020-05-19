import sys, os.path, io
sys.path.append('D:/home/python364x86/Lib/site-packages')
from textblob import TextBlob
import json

def readReviews():
    with open('sentimentJson/reviewsForSentiment.json',encoding='utf-8') as reviewsFile:
        return json.load(reviewsFile)
# def readReviews():
#     with open('crawlerResults/reviewSpiderResults.json',encoding='utf-8') as reviewsFile:
#         return json.load(reviewsFile)

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
    if(total == 0):
        return 0
    else:
        return round((count/total)*100,2)

    
def sentimentAnalys(data):
    placesNames = []
    placeIds = []
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
        placeIds.append(reviewsDet["placeId"])
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
            "placeID":placeIds[x],
            "positivePresentage":positive[x],
            "negativePresentage":negative[x],
            "naturalPresentage":natural[x],
            "totalPolarity":totalPolarities[x],
            "totalReviews":totalReviewCounts[x],
            "polarityis":polarities[x],
            "subjectivities":subjectivities[x],
            "bestReview":bestReviews[x]            
        })
    
    try:
        analysedData = {"analyse":data}
        saveSentiment(analysedData)
        return True
    except:
        return False

    


if(sentimentAnalys(readReviews())):
    print("OK")
else:
    print("ERROR")



                







        


        

