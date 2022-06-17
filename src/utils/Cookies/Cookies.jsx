export const setCookieStorage = (key, value, args = { exVal: "", expType: "", secure: false, samesite: "" }) => {
  let expires = ""
  if(typeof value === "object") {
    value = encodeURIComponent(JSON.stringify(value))
  }
  if (args.exVal && args.expType) {
    let d = new Date();
    if (args.expType === "days")
      d.setTime(d.getTime() + (args.exVal * 24 * 60 * 60 * 1000));
    else
      d.setTime(d.getTime() + (args.exVal * 60 * 60 * 1000));
    expires = d.toUTCString();
  }
  document.cookie = `${key}=${value};path=/;${expires ? `expires=${expires};` : ""}${args.secure ? "" : ""}${args.samesite ? `samesite=${args.samesite}` : ""}`
}

/**
 * Function to get cookie from cookie storage.
 */
export const getCookieStorage = (key) => {
  let returnVal = "";
  let allCookieArray = decodeURIComponent(document.cookie).split(';');
  for (let i = 0; i < allCookieArray.length; i++) {
    let temp = allCookieArray[i].trim();
    if (temp.indexOf(key) === 0) {
      returnVal = temp.substring(key.length + 1, temp.length);
      if(returnVal) {
        try {
          returnVal = JSON.parse(returnVal)
        } catch(error) {
          return null
        }
      }
      break;
    }
  }
  return returnVal;
}

export const getStringCookieStorage = (key) => {
  let returnVal = "";
  let allCookieArray = decodeURIComponent(document.cookie).split(';');
  for (let i = 0; i < allCookieArray.length; i++) {
    let temp = allCookieArray[i].trim();
    if (temp.indexOf(key) === 0) {
      returnVal = temp.substring(key.length + 1, temp.length);
      break;
    }
  }
  return returnVal;
}

/**
 * Function to remove a particular cookie.
 */
export const removeCookieStorage = (key) => {
  document.cookie = key + "= ;expires = Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

/**
 * Function to remove all cookies stored.
 */
export const clearCookieStorage = () => {
  let allCookieArray = document.cookie.split(';');
  for (var i = 0; i < allCookieArray.length; i++) {
    var cookie = allCookieArray[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  }
}