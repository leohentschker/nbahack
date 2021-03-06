import praw
import datetime
import time


TEAM_SUBREDDITS = {
    "LAL": "lakers",
    "OKC": "Thunder",
}

client = praw.Reddit(client_id = 'dzjIVH_UixaDfw',
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
    nbaposts = self.getNumPosts("nba", startUnix, endUnix)
    return team1posts + team2posts, nbaposts