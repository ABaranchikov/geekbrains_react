export const getCurrentDate = () => {
    const day = new Date();
    let curr_date = day.getDate();
    curr_date = curr_date < 10 ? '0' + curr_date : curr_date;
    let curr_month = day.getMonth() + 1;
    curr_month = curr_month < 10 ? '0' + curr_month : curr_month;
    const curr_year = day.getFullYear();
    return `${curr_year}-${curr_month}-${curr_date} ${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`
}