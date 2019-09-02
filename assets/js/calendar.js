var today = new Date();
window.onload = function() {
  generateCalendar(today);
}

// 上一个月
document.getElementById('pre_month').onclick = function() {
  var targetMonth = parseInt(document.getElementById('show_date').innerHTML.substr(5)) - 1;
  var year = parseInt(document.getElementById('show_date').innerHTML.substr(0, 4));
  if (targetMonth == (today.getMonth() + 1) && year == today.getFullYear()) {
    generateCalendar(today);
  } else{
    generateCalendar(new Date(year, targetMonth - 1, 1));
  }
}

// 下一个月
document.getElementById('next_month').onclick = function() {
  var targetMonth = parseInt(document.getElementById('show_date').innerHTML.substr(5)) + 1;
  var year = parseInt(document.getElementById('show_date').innerHTML.substr(0, 4));
  if (targetMonth == (today.getMonth() + 1) && year == today.getFullYear()) {
    generateCalendar(today);
  } else{
    generateCalendar(new Date(year, targetMonth - 1, 1));
  }
}

// 生成日历
function generateCalendar(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var dayBegin = new Date(year, month - 1, 1).getDay();
  var dayCount = new Date(year, month, 0).getDate();
  if (month < 10) {
    month = "0" + "" + month;
  }

  document.getElementById('show_date').innerHTML = year + '.' + month;

  var html = '<table><tr>';
  var dayIndex = 1;
  var haveContent = false;
  for (var index = 0; index < 37; index++) {
    // the actual days in a month
    if (index > dayBegin && index <= (dayCount + dayBegin)) {
      // judge if the date have post content; travers add the post content date;
      if (index < 10) {
        index = "0" + "" + index;
      }
      var value = post_dates.get(year + month + index + '');
      if (value != null) {
        console.log(year + month + index + ' : ' + value);
        html += '<td class="calendar_column" ><a href="' + siteUrl + value + '" style="color:#5a862d;font-weight:bolder"  title="' + value + '"';
      } else {
        html += '<td class="calendar_column" onclick="onDateClick('+ year + month + dayIndex + ')" title="这一天偷懒喽"><a ';
      }
      if (dayIndex == day) {
        html += 'class="active_date">' + dayIndex + '</a>';
      } else {
        html += 'class="normal_date">' + dayIndex + '</a>';
      }
      dayIndex++;
    // the white space after the days of month, to maintain the height of the whole component
    } else if (index > (dayCount + dayBegin)) {
      html += '<td class="calendar_column" style="opacity: 0">a</td>';
    // the white space before the first day of month
    } else {
      html += '<td class="calendar_column"></td>';
    }
    if (index % 7 == 0) {
      html += '</tr><tr>';
    }
  }
  html += '</tr></table>';
  document.getElementById("calendar_body_container").innerHTML = html;
}
function onDateClick(date) {
  alert(date + "偷懒了一整天，什么都没写");
}