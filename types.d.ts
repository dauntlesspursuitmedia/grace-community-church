// Generated by https://quicktype.io

export interface SermonList {
	results:         Sermon[];
	nodeType?:        string;
	nodeDisplayName?: string;
	totalCount?:      number;
	next?:            string;
}

export interface Sermon {
	sermonID:              string;
	fullTitle:             string;
	displayTitle:          string;
	languageCode:          string;
	bibleText:             string;
	subtitle:              string;
	moreInfoText:          string;
	eventType:             string;
	broadcaster:           Broadcaster;
	speaker:               PrimarySpeaker;
	series:                string;
	hasAudio:              boolean;
	hasVideo:              boolean;
	audioDurationSeconds:  number;
	videoDurationSeconds:  number;
	downloadCount:         number;
	videoDownloadCount:    number;
	commentCount:          number;
	preachDate:            string;
	pickDate:              string;
	lastFeatureDate:       string;
	publishTimestamp:      number;
	followed:              boolean;
	type:                  string;
	updateDate:            number;
	lastAccessDate:        string;
	publishDate:           string;
	displayEventType:      string;
	documentDownloadCount: number;
	externalLink:          string;
	media:                 Media;
	waveformPeaksURL:      string;
	keywords:              string;
	socialSharing:         string;
	archivedWebcastID:     number;
	captionLanguages:      CaptionLanguages;
}

export interface Media {
	type: string;
  audio?: NestedMedia[];
	video?: NestedMedia[];

}

export interface NestedMedia {
  type: string;
  mediaType: string;
  live: boolean;
  streamURL: string;
  eventStreamURL: string;
  downloadURL: string;
  thumbnailImageURL?: string;
  bitrate: number;
  fileSizeBytes?: number;
  adaptiveBitrate?: boolean;
  duration?: number;
}
export interface Broadcaster {
	type:                        string;
	lite_type:                   string;
	broadcasterID:               string;
	displayName:                 string;
	location:                    string;
	minister:                    string;
	latitude:                    number;
	longitude:                   number;
	imageURL:                    string;
	imageURLResizable:           string;
	denomination:                string;
	webcastInProgress:           boolean;
	phone:                       string;
	followed:                    boolean;
	donatable:                   boolean;
	miles:                       number;
	languageCode:                string;
	aboutUs:                     string;
	numberOfSermons:             number;
	idCode:                      string;
	shortName:                   string;
	address:                     string;
	addressMail:                 string;
	country:                     string;
	countryISOCode:              string;
	facebookUsername:            string;
	twitterUsername:             string;
	homePageURL:                 string;
	albumArtURL:                 string;
	bibleVersion:                string;
	serviceTimesArePreformatted: string;
	serviceTimes:                string;
	serviceTimesList:            ServiceTimesList[];
	canWebcast:                  boolean;
	listenLineNumber:            string;
	vacantPulpit:                boolean;
	categories:                  number;
	welcomeVideoID:              string;
	disabled:                    boolean;
	soloSiteDisabled:            boolean;
	joined:                      number;
	soloSite:                    string;
	rssFeedURL:                  string;
	rssFeedAtomURL:              string;
	churchSize:                  number;
	primarySpeaker:              string;
	primarySpeakers:             PrimarySpeaker[];
	groups:                      string[];
	socialAccounts:              SocialAccount[];
	bannerImageURL:              string;
}

export interface PrimarySpeaker {
	type:                              string;
	speakerID:                         number;
	displayName:                       string;
	portraitURL:                       string;
	albumArtURL:                       string;
	roundedThumbnailImageURL:          string;
	portraitURLResizable:              string;
	roundedThumbnailImageURLResizable: string;
	followed:                          boolean;
}

export interface ServiceTimesList {
	serviceTypeID: number;
	title:         string;
	startTime:     string;
	dayOfWeek:     number;
}

export interface SocialAccount {
	url:   string;
	label: string;
}

export interface CaptionLanguages {
}

// Generated by https://quicktype.io

export interface SeriesList {
	nodeType:        string;
	nodeDisplayName: string;
	results:         Series[];
	totalCount:      number;
	next:            string;
}

export interface Series {
	type:           ResultType;
	seriesID:       number;
	title:          string;
	broadcasterID:  BroadcasterID;
	latest:         string;
	earliest:       string;
	updated:        number;
	count:          number;
	description:    null;
	podcastEnabled: boolean;
	podcastSpeaker: null;
	feedLinks:      null;
	image:          null | string;
	imageResizable: null | string;
	rssURL:         string;
	rssAtomURL:     string;
	broadcaster:    Broadcaster;
	followed:       boolean;
	languageCode:   null;
}


export enum BroadcasterID {
	Cbcofmanchestertn = "cbcofmanchestertn",
}

export enum Name {
	GraceCommunityChurch = "Grace Community Church",
}

export enum Location {
	ManchesterTennessee = "Manchester, Tennessee",
}

export enum BroadcasterType {
	LiteContainedBroadcaster = "lite_contained_broadcaster",
}

export enum ResultType {
	Series = "series",
}
