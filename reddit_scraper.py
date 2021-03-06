import praw
import datetime
import time

class RedditScraper(object):

    TEAM_SUBREDDITS = {'DAL': 'mavericks', 
                       'DEN': 'denvernuggets', 
                       'GSW': 'warriors', 
                       'HOU': 'rockets', 
                       'LAC': 'LAClippers', 
                       'LAL': 'lakers', 
                       'MEM': 'memphisgrizzlies', 
                       'MIN': 'timberwolves', 
                       'NOP': 'NOLAPelicans', 
                       'OKC': 'Thunder', 
                       'PHX': 'suns', 
                       'POR': 'ripcity', 
                       'SAC': 'kings', 
                       'SAS': 'NBASpurs', 
                       'UTA': 'utahjazz', 
                       'ATL': 'atlantahawks', 
                       'BOS': 'bostonceltics', 
                       'BKN': 'gonets', 
                       'CHA': 'charlottehornets', 
                       'CHI': 'chicagobulls', 
                       'CLE': 'clevelandcavs', 
                       'DET': 'detroitpistons', 
                       'IND': 'pacers', 
                       'MIA': 'heat', 
                       'MIL': 'mkebucks', 
                       'NYK': 'nyknicks', 
                       'ORL': 'orlandomagic', 
                       'PHI': 'sixers', 
                       'TORONTO': 'torontoraptors', 
                       'WAS': 'washingtonwizards'}

    def __init__(self):
        self.client = praw.Reddit(client_id = 'dzjIVH_UixaDfw',
                     client_secret = 'Bw6C3Bg0veilJSFso4vkY7LtuRc',
                     redirecturl='http://pythonprogramming.net',
                     user_agent = 'nbahack')

    def toUnix(self, d):
        return time.mktime(d.timetuple())

    def getNumPosts(self, subredditName, start, end):
        subreddit = self.client.subreddit(subredditName)
        num = 0
        for s in  subreddit.submissions(start=start, end=end):
            num += 1
        return num

    def postsForGame(self, team1, team2, startTime):
        endTime = startTime + datetime.timedelta(hours=5)
        startUnix = self.toUnix(startTime)
        endUnix = self.toUnix(endTime)
        team1posts = self.getNumPosts(self.TEAM_SUBREDDITS[team1], startUnix, endUnix)
        team2posts = self.getNumPosts(self.TEAM_SUBREDDITS[team2], startUnix, endUnix)
        return team1posts + team2posts


if __name__ == "__main__":
    scraper = RedditScraper()
    scraper.postsForGame("OKC", "LAL", time)
