type startTimeData = {
    hour: number,
    minute: number
}


export function handleStartTime(startTime: startTimeData) {
    const hoursMlSec = startTime.hour * 60 * 60 * 1000;
    const minuteMlSec = startTime.minute * 60 * 1000;
    const startDate = new Date(minuteMlSec + hoursMlSec + 3 * 60 * 60 * 1000);
    return String(startDate);
}

export function getEndDate(startTime: startTimeData, workJourney: number, breakTime: number, extraTime: number) {
    const startDate = handleStartTime(startTime);
    const startMlSeconds = new Date(startDate).getTime();
    const workJourneyMlSeconds = workJourney * 60 * 60 * 1000;
    const breakTimeMlSeconds = breakTime * 60 * 1000;
    const extraTimeMlSeconds = extraTime * 60 * 1000;
    const endMlSeconds = startMlSeconds + workJourneyMlSeconds + breakTimeMlSeconds + extraTimeMlSeconds;
    const endTimeDate = new Date(endMlSeconds);

    return endTimeDate;
}

export function getTimeDiff(startTime: { hour: number, minute: number }, endTime: { hour: number, minute: number }, extraTime: number) {
    const startTimeMinutes = startTime.hour * 60 + startTime.minute - extraTime;
    const endTimeMinutes = endTime.hour * 60 + endTime.minute;

    const  periodException = 1000 * 60 * 60 * 21 // 21hrs;
    const convertToMlSecs = 60 * 1000; 
    const diff = endTimeMinutes - startTimeMinutes;
    const diffAbs = (Math.abs(diff)) * convertToMlSecs - periodException;
    
    const dateDiff = new Date(diffAbs);

    if (diff < 0) {
        return `- ${formatEndDate(dateDiff)}`
    } else {
        return `+ ${formatEndDate(dateDiff)}`
    }
}




export function formatEndDate(date: Date) {
    return date.toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }).substring(11, 17);
}


