import datetime
from pytrends.request import TrendReq

class TrendsScraper(object):

    TEAM_TERMS = {
        "LAL": ["lakers"],
        "OKC": ["Thunder"],
    }

    def __init__(self):
        self.client = TrendReq()

    def toString(self, d):
        return d.strftime("%Y-%m-%d")

    def getNumSearches(self, terms, date, endDate):
        startString = self.toString(date)
        endString = self.toString(endDate)
        dates = startString + " " + endString

        self.client.build_payload(kw_list=terms, timeframe=dates)
        print self.client.interest_over_time()
        return 0

    def postsForGame(self, team1, team2, startTime):
        endDate = startTime + datetime.timedelta(days=1)
        team1interest = self.getNumSearches(self.TEAM_TERMS[team1], startTime, endDate)
        team2interest = self.getNumSearches(self.TEAM_TERMS[team2], startTime, endDate)
        return team1interest + team2interest


if __name__ == "__main__":
    scraper = TrendsScraper()
    scraper.postsForGame("OKC", "LAL", datetime.datetime.now() - datetime.timedelta(hours=60))
