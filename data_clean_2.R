setwd("C:/Users/owner/Desktop/nbahack")

playerdata<-read.csv("data/Player_Data.csv",sep=",",header=TRUE,stringsAsFactors = FALSE)

playerdata<-playerdata[playerdata$Minutes>15,]

hist(playerdata$Minutes)
hist(playerdata$Points)
hist(playerdata$Defensive_Rebounds)
hist(playerdata$Offensive_Rebounds)
hist(playerdata$Assists)
hist(playerdata$Steals)
hist(playerdata$Blocks)
hist(playerdata$Turnovers)
hist(playerdata$Plus_Minus)

hist(playerdata$Field_Goals)
hist(playerdata$Field_Goals_Attempted)
hist(playerdata$Field_Goals/playerdata$Field_Goals_Attempted)

hist(playerdata$Three_Pointers)
hist(playerdata$Three_Pointers_Attempted)
hist(playerdata$Three_Pointers/playerdata$Three_Pointers_Attempted)

hist(playerdata$Free_Throws)
hist(playerdata$Free_Throws_Attempted)
hist(playerdata$Free_Throws/playerdata$Free_Throws_Attempted)

hist(playerdata$Personal_Fouls)






rsn<-read.csv("data/RSN_Ratings.csv",sep=",",header=TRUE,stringsAsFactors = FALSE)

dur<-rsn$DUR[!is.na(rsn$DUR)]
hist(dur)

rsn$HH.RTG<-as.numeric(rsn$HH.RTG)
rtg<-rsn$HH.RTG[!is.na(rsn$HH.RTG)]
hist(rtg)

summary(rtg)

rsn$HH.SHR<-as.numeric(rsn$HH.SHR)
shr<-rsn$HH.SHR[!is.na(rsn$HH.SHR)]
hist(shr)

summary(shr)

rsn$HH.IMP<-as.numeric(rsn$HH.IMP)
imp<-rsn$HH.IMP[!is.na(rsn$HH.IMP)]
hist(imp)

summary(imp)


rsn$P2..IMP<-as.numeric(rsn$P2..IMP)
p2imp<-rsn$P2..IMP[!is.na(rsn$P2..IMP)]
hist(p2imp)

dur1<-rsn$DUR.1[!is.na(rsn$DUR.1)]
hist(dur1)

rsn$HH.RTG.1<-as.numeric(rsn$HH.RTG.1)
rtg1<-rsn$HH.RTG.1[!is.na(rsn$HH.RTG.1)]
hist(rtg1)

rsn$HH.SHR.1<-as.numeric(rsn$HH.SHR.1)
shr1<-rsn$HH.SHR.1[!is.na(rsn$HH.SHR.1)]
hist(shr1)

rsn$HH.IMP.1<-as.numeric(rsn$HH.IMP.1)
imp1<-rsn$HH.IMP.1[!is.na(rsn$HH.IMP.1)]
hist(imp1)

rsn$P2..IMP.1<-as.numeric(rsn$P2..IMP.1)
p2imp1<-rsn$P2..IMP.1[!is.na(rsn$P2..IMP.1)]
hist(p2imp1)







gamedata<-read.csv("data/Game_Data.csv",sep=",",header=TRUE,stringsAsFactors = FALSE)
gamedata<-gamedata[6899:16738,]

rsn<-read.csv("data/RSN_Ratings.csv",sep=",",header=TRUE,stringsAsFactors = FALSE)
rsn$GM[2007]="774"
rsn$GM<-as.numeric(rsn$GM)

rsn2017<-rsn[1:1233,]
rsn2017<-rsn2017[order(rsn2017$GM),]
rsn2016<-rsn[1234:2463,]
rsn2016<-rsn2016[order(rsn2016$GM),]
rsn2015<-rsn[2464:3694,]
rsn2015<-rsn2015[order(rsn2015$GM),]
rsn2014<-rsn[3695:4925,]
rsn2014<-rsn2014[order(rsn2014$GM),]


rsn<-rbind(rsn2014,rsn2015,rsn2016,rsn2017)

rsn<-rsn[-1160,]
rsn$GM[1160:1230]<-rsn$GM[1160:1230]-1
write.csv(file="data/RSN_Ratings2.csv",rsn)

rsn<-rsn[-2384,]
rsn$GM[2384:2460]<-rsn$GM[2384:2460]-1

rsn<-rsn[-3957,]
rsn$GM[3957:4920]<-rsn$GM[3957:4920]-1

rsn<-rsn[-4250,]
rsn$GM[4250:4920]<-rsn$GM[4250:4920]-1

rsn<-rsn[-4631,]
rsn$GM[4631:4920]<-rsn$GM[4631:4920]-1


for(i in 3690:4920){
  if(rsn$AWAY[i]!=gamedata$Team[2*i-1] && rsn$AWAY[i]!=gamedata$Team[2*i]){
    print(i)
    break;
  }
}

write.csv(file="data/RSN_Ratings2.csv",rsn)

nationalRatings<-read.csv("data/National_Ratings.csv",sep=",",header=TRUE,stringsAsFactors=FALSE)

rsn<-read.csv("data/RSN_Ratings2.csv",sep=",",header=TRUE,stringsAsFactors=FALSE)
rsn$Game_id=rep(0,nrow(rsn))
rsn$National.Rating=rep(0,nrow(rsn))
rsn$Average.Viewers=rep(0,nrow(rsn))
rsn$Average.Households=rep(0,nrow(rsn))
rsn$ratings=rep(0,nrow(rsn))

for(i in 1:nrow(rsn)){
  year=substr(rsn$DATE[i],3,4)
  year<-paste("2",year,sep="")
  gameString=rsn$GM[i]
  zeroes="00000000"
  gameid=paste(year,substr(zeroes,1,8-3-nchar(gameString)),gameString,sep="")
  rsn$Game_id[i]=gameid
}

count=0
i=1
for(i in 1:nrow(nationalRatings)){
  j1=which(rsn$DATE==nationalRatings$Date[i])
  df=rsn[j1,]
  j2=which(df$AWAY==nationalRatings[i,"Away.Team"])
  if(length(j2)>0){
    rsn$National.Rating[min(j1)+j2-1]=nationalRatings[i,"National.Rating"]
    rsn$Average.Viewers[min(j1)+j2-1]=nationalRatings[i,"Average.Viewers..000."]
    rsn$Average.Households[min(j1)+j2-1]=nationalRatings[i,"Average.Households..000."]
    count=count+1
  }
}
print(count)

write.csv(file="data/RSN_Ratings3.csv",rsn)




gamedata2<-read.csv("data/new_gam.csv",sep=",",header=TRUE,stringsAsFactors=FALSE)

count=0
for(i in 1:nrow(rsn)){
  if(21300000<rsn$Game_id[i] && rsn$Game_id[i]<=21601231){
    count=count+1
  }
}
print(count)

nrow(rsn)

c=3

for(i in 1:nrow(rsn)){
  if(rsn$National.Rating[i]==0){
    away=as.numeric(rsn$HH.RTG[i])
    home=as.numeric(rsn$HH.RTG.1[i])
    sum=0
    count=0
    if(!is.na(home)){
      count=count+1
      sum=sum+home
    }
    if(!is.na(away)){
      count=count+1
      sum=sum+away
    }
    
    if(count!=0){
      rsn$ratings[i]=sum/count
    }
  } else{
    rsn$ratings[i]=c*rsn$National.Rating[i]
  }
}

write.csv(file="data/RSN_Ratings3.csv",rsn)



compare1=c()
compare2=c()

for(i in 1:nrow(rsn)){
    if(rsn$National.Rating[i]==0){next}
    
    away=as.numeric(rsn$HH.RTG[i])
    home=as.numeric(rsn$HH.RTG.1[i])
    sum=0
    count=0
    if(!is.na(home)){
      count=count+1
      sum=sum+home
    }
    if(!is.na(away)){
      count=count+1
      sum=sum+away
    }
    if(count==0){next}
    
    compare1=c(compare1,rsn$National.Rating[i])
    compare2=c(compare2,sum/count)
}


sum(compare2)/sum(compare1) #about 4

sum(rsn$National.Rating[(which(rsn$National.Rating!=0))])/length(which(rsn$National.Rating!=0))


write.csv(file="data/RSN_Ratings3.csv",rsn)