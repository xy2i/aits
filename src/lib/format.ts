import Decimal from "break_infinity.js";

export function withComma(thatNumber: number): string {
    let finalNumber = "";
    if (thatNumber == Infinity || isNaN(thatNumber)) {
        finalNumber = "-----"; Decimal;
    }
    else {
        if (thatNumber > 999999999999999) {
            return thatNumber.toString()
            //thatNumber = 999999999999999;
        }
        let cNegative = false;
        let groupval = thatNumber;
        if (thatNumber < 0) {
            groupval = Math.abs(thatNumber);
            cNegative = true;
        }
        let group1 = Math.floor(groupval / 1000000000000);
        let group2 = Math.floor(groupval / 1000000000) - group1 * 1000;
        let group3 = Math.floor(groupval / 1000000) - group1 * 1000000 - group2 * 1000;
        let group4 = Math.floor(groupval / 1000) - group1 * 1000000000 - group2 * 1000000 - group3 * 1000;
        let group5 = Math.floor(groupval) - group1 * 1000000000000 - group2 * 1000000000 - group3 * 1000000 - group4 * 1000;
        let groupCount = 1;
        if (group4 > 0) {
            groupCount = 2;
        }
        if (group3 > 0) {
            groupCount = 3;
        }
        if (group2 > 0) {
            groupCount = 4;
        }
        if (group1 > 0) {
            groupCount = 5;
        }
        if (groupCount >= 2 && group5 < 10) {
            group5 = "0" + group5;
        }
        if (groupCount >= 2 && group5 < 100) {
            group5 = "0" + group5;
        }
        if (groupCount >= 3 && group4 < 10) {
            group4 = "0" + group4;
        }
        if (groupCount >= 3 && group4 < 100) {
            group4 = "0" + group4;
        }
        if (groupCount >= 4 && group3 < 10) {
            group3 = "0" + group3;
        }
        if (groupCount >= 4 && group3 < 100) {
            group3 = "0" + group3;
        }
        if (groupCount >= 5 && group2 < 10) {
            group2 = "0" + group2;
        }
        if (groupCount >= 5 && group2 < 100) {
            group2 = "0" + group2;
        }
        if (groupCount == 5) {
            finalNumber = group1 + "," + group2 + "," + group3 + "," + group4 + "," + group5;
        }
        if (groupCount == 4) {
            finalNumber = group2 + "," + group3 + "," + group4 + "," + group5;
        }
        if (groupCount == 3) {
            finalNumber = group3 + "," + group4 + "," + group5;
        }
        if (groupCount == 2) {
            finalNumber = group4 + "," + group5;
        }
        if (groupCount == 1) {
            finalNumber = group5;
        }
        if (cNegative == true) {
            finalNumber = "-" + finalNumber;
        }
    }
    return finalNumber;
}

export function convertSecCD(thatNumber: number): string {
    if (thatNumber < 0) {
        thatNumber = 0;
    }
    let min = Math.floor(thatNumber / 60);
    let sec = Math.floor(thatNumber) - min * 60;
    if (sec < 10) {
        sec = "0" + sec;
    }
    return min + ":" + sec;
}

export function convertMin(thatNumber) {
    if (thatNumber < 0) {
        thatNumber = 0;
    }
    let hr = Math.floor(thatNumber / 3600);
    let min = Math.floor(thatNumber / 60) - hr * 60;
    if (min < 10) {
        min = "0" + min;
    }
    return hr + ":" + min;
}

export function convertSecFull(thatNumber) {
    if (thatNumber < 0) {
        thatNumber = 0;
    }
    let hr = Math.floor(thatNumber / 3600);
    let min = Math.floor(thatNumber / 60) - hr * 60;
    let sec = Math.floor(thatNumber) - hr * 3600 - min * 60;
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return hr + ":" + min + ":" + sec;
}