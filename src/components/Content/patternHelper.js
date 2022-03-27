import moment from 'moment'

const formatLink = (text) => {
  return "osu://edit/" + text;
};

const formatCardTitle = (beatmap) => {
  return `${beatmap.artist} - ${beatmap.title} [${beatmap.version}] mapped by ${beatmap.creator}`;
};

const formatUserProfile = (osuId) => {
  return `https://osu.ppy.sh/users/${osuId}`;
};

const getBeatmapUrl = (beatmap) => {
  return `https://osu.ppy.sh/beatmapsets/${beatmap.beatmapSetId}#mania/${beatmap.id}`;
};

const formatDate = (dateString) => {
  var date = new Date(dateString);
  var formatted = moment(date).format('MMMM D, YYYY');
  return formatted
}

export { formatLink, formatCardTitle, formatUserProfile, getBeatmapUrl , formatDate};
