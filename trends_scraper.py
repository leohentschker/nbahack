import datetime
from pytrends.request import TrendReq

class TrendsScraper(object):

    TEAM_TERMS = {'DAL': 'mavericks', 
                  'DEN': 'denver nuggets', 
                  'GSW': 'warriors', 
                  'HOU': 'rockets', 
                  'LAC': 'LA Clippers', 
                  'LAL': 'lakers', 
                  'MEM': 'memphis grizzlies', 
                  'MIN': 'timberwolves', 
                  'NOP': 'New Orleans Pelicans', 
                  'OKC': 'OKC Thunder', 
                  'PHX': 'suns', 
                  'POR': 'ripcity', 
                  'SAC': 'Sacramento kings', 
                  'SAS': 'San Antonio Spurs', 
                  'UTA': 'utah jazz', 
                  'ATL': 'atlanta hawks', 
                  'BOS': 'boston celtics', 
                  'BKN': 'brooklyn nets', 
                  'CHA': 'charlotte hornets', 
                  'CHI': 'chicago bulls', 
                  'CLE': 'cleveland cavs', 
                  'DET': 'detroitpistons', 
                  'IND': 'pacers', 
                  'MIA': 'heat', 
                  'MIL': 'milwaukee bucks', 
                  'NYK': 'ny knicks', 
                  'ORL': 'orlando magic', 
                  'PHI': 'sixers', 
                  'TORONTO': 'toronto raptors', 
                  'WAS': 'washington wizards'}

    def __init__(self):
        self.client = TrendReq()

    def toString(self, d):
        return d.strftime("%Y-%m-%d")

    def getNumSearches(self, terms, date, endDate):
        startString = self.toString(date)
        endString = self.toString(endDate)
        dates = startString + " " + endString

        self.client.build_payload(kw_list=terms, timeframe=dates)
        interest = self.client.interest_over_time()

        total = 0
        for _, row in interest.iterrows():
            for term in terms:
                total += row.get(term, 0)
        return total

    def postsForGame(self, team1, team2, startTime):
        endDate = startTime + datetime.timedelta(days=1)
        team1interest = self.getNumSearches(self.TEAM_TERMS[team1], startTime, endDate)
        team2interest = self.getNumSearches(self.TEAM_TERMS[team2], startTime, endDate)
        return team1interest + team2interest


if __name__ == "__main__":
    scraper = TrendsScraper()
    scraper.postsForGame("OKC", "LAL", datetime.datetime.now() - datetime.timedelta(hours=60))
