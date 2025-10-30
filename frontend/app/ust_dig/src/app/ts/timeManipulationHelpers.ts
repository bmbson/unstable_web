export function fancyTimeFormat(duration: number) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
  }

export function reverseFancyTimeFormat(timeString: string) {
  if (timeString == undefined) {
    return null;
  }
  const timeParts = timeString.split(":").map(part => parseInt(part));
  
  if (timeParts.length === 2) {
    // Format: "mm:ss"
    return timeParts[0] * 60 + timeParts[1];
  } else if (timeParts.length === 3) {
    // Format: "hh:mm:ss"
    return timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
  } else {
    // Invalid format
    return null;
  }
}
