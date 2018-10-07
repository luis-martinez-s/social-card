// Test date and time objects / methods
let postDateStr = 'October 6, 2018 03:24:00';
let postDate = new Date(postDateStr);
let now = new Date();


// console.log('now',now);
// console.log(postDate);
// console.log(now - postDate);

// I want function that returns a time length in specific format:
// Now
// 1m >> 59m
// 1h >> 23h
// 1d >> xd
// Sep 30 >> Jan 1
// 2017
// With input being one date object

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const postAge = function (postDate) {
    let now = new Date();
    let postAge = '';
    let thisYearFirstDay = new Date();
    thisYearFirstDay.setHours(0,0,0)
    thisYearFirstDay.setMonth(0, 1);
    if ((now - postDate) / 1000 < 60) {
        return 'Now'
    }
    if ((now - postDate) / 1000 < 3600) {
        postAge = Math.floor((now - postDate) / 60000);
        return postAge + 'm';
    }
    if ((now - postDate) / 1000 < (3600 * 24)) {
        postAge = Math.floor((now - postDate) / 3600000);
        return postAge + 'h';
    }
    if ((now - postDate) <= (now - thisYearFirstDay + 1000)) {
        let postMonth = postDate.getMonth();
        return months[postMonth] + ' ' + postDate.getDate();
    }
    return postDate.getFullYear();
}

console.log(postAge(new Date('January 1, 2018 00:00:00')));