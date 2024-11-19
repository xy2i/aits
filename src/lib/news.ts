import { _root } from "@/flash/root";

export function dispNews(type, news) {
    let b;
    let c;
    if (_root.save.breakNewsMode == 1) {
        let ignoreNews = true;
        if (_root.saveGlobal.breakAll[type] == true || _root.saveGlobal.breakFeature[type] == true || _root.saveGlobal.breakTab1[type] == true || _root.saveGlobal.breakTab2[type] == true || _root.saveGlobal.breakTab3[type] == true || _root.saveGlobal.breakTab4[type] == true) {
            ignoreNews = false;
        }
        if (ignoreNews == false) {
            b = 30;
            while (b >= 2) {
                let imp = 1;
                while (imp <= 4) {
                    if (_root.saveGlobal["breakTab" + imp][type] == true) {
                        _root["X" + imp + "breakNews" + b] = _root["X" + imp + "breakNews" + (b - 1)];
                        _root["X" + imp + "breakStamp" + b] = _root["X" + imp + "breakStamp" + (b - 1)];
                        _root["X" + imp + "breakColor" + b] = _root["X" + imp + "breakColor" + (b - 1)];
                    }
                    imp++;
                }
                if (_root.saveGlobal.breakAll[type] == true) {
                    c = 1;
                    while (c <= 30) {
                        _root["F" + c + "breakNews" + b] = _root["F" + c + "breakNews" + (b - 1)];
                        _root["F" + c + "breakStamp" + b] = _root["F" + c + "breakStamp" + (b - 1)];
                        _root["F" + c + "breakColor" + b] = _root["F" + c + "breakColor" + (b - 1)];
                        c++;
                    }
                }
                else if (_root.saveGlobal.breakFeature[type] == true) {
                    let ft = _root.newsFeature[type];
                    _root["F" + ft + "breakNews" + b] = _root["F" + ft + "breakNews" + (b - 1)];
                    _root["F" + ft + "breakStamp" + b] = _root["F" + ft + "breakStamp" + (b - 1)];
                    _root["F" + ft + "breakColor" + b] = _root["F" + ft + "breakColor" + (b - 1)];
                }
                b -= 1;
            }
            let imp = 1;
            while (imp <= 4) {
                if (_root.saveGlobal["breakTab" + imp][type] == true) {
                    _root["X" + imp + "breakNews1"] = news;
                    _root["X" + imp + "breakStamp1"] = "[" + _root.clock_display + "]";
                    _root["X" + imp + "breakColor1"] = _root.saveGlobal.breakR[type] * 65536 + _root.saveGlobal.breakG[type] * 256 + _root.saveGlobal.breakB[type];
                }
                imp++;
            }
            if (_root.saveGlobal.breakAll[type] == true) {
                c = 1;
                while (c <= 30) {
                    _root["F" + c + "breakNews1"] = news;
                    _root["F" + c + "breakStamp1"] = "[" + _root.clock_display + "]";
                    _root["F" + c + "breakColor1"] = _root.saveGlobal.breakR[type] * 65536 + _root.saveGlobal.breakG[type] * 256 + _root.saveGlobal.breakB[type];
                    c++;
                }
            }
            else if (_root.saveGlobal.breakFeature[type] == true) {
                let ft = _root.newsFeature[type];
                _root["F" + ft + "breakNews1"] = news;
                _root["F" + ft + "breakStamp1"] = "[" + _root.clock_display + "]";
                _root["F" + ft + "breakColor1"] = _root.saveGlobal.breakR[type] * 65536 + _root.saveGlobal.breakG[type] * 256 + _root.saveGlobal.breakB[type];
            }
            _root.updateBreakNews = 1;
        }
    }
    else if (_root.save.breakNewsMode == 2) {
        if (_root.saveGlobal.defTab == 5) {
            if (_root.saveGlobal.breakAll[type] == true || _root.saveGlobal.breakFeature[type] == true && _root.house._currentframe == _root.newsFeature[type]) {
                b = 30;
                while (b >= 2) {
                    if (_root.saveGlobal.breakAll[type] == true) {
                        c = 1;
                        while (c <= 30) {
                            _root["F" + c + "breakNews" + b] = _root["F" + c + "breakNews" + (b - 1)];
                            _root["F" + c + "breakStamp" + b] = _root["F" + c + "breakStamp" + (b - 1)];
                            _root["F" + c + "breakColor" + b] = _root["F" + c + "breakColor" + (b - 1)];
                            c++;
                        }
                    }
                    else if (_root.saveGlobal.breakFeature[type] == true) {
                        ft = _root.newsFeature[type];
                        _root["F" + ft + "breakNews" + b] = _root["F" + ft + "breakNews" + (b - 1)];
                        _root["F" + ft + "breakStamp" + b] = _root["F" + ft + "breakStamp" + (b - 1)];
                        _root["F" + ft + "breakColor" + b] = _root["F" + ft + "breakColor" + (b - 1)];
                    }
                    b -= 1;
                }
                if (_root.saveGlobal.breakAll[type] == true) {
                    c = 1;
                    while (c <= 30) {
                        _root["F" + c + "breakNews1"] = news;
                        _root["F" + c + "breakStamp1"] = "[" + _root.clock_display + "]";
                        _root["F" + c + "breakColor1"] = _root.saveGlobal.breakR[type] * 65536 + _root.saveGlobal.breakG[type] * 256 + _root.saveGlobal.breakB[type];
                        c++;
                    }
                }
                else if (_root.saveGlobal.breakFeature[type] == true) {
                    ft = _root.newsFeature[type];
                    _root["F" + ft + "breakNews1"] = news;
                    _root["F" + ft + "breakStamp1"] = "[" + _root.clock_display + "]";
                    _root["F" + ft + "breakColor1"] = _root.saveGlobal.breakR[type] * 65536 + _root.saveGlobal.breakG[type] * 256 + _root.saveGlobal.breakB[type];
                }
                _root.updateBreakNews = 1;
            }
        }
        else if (_root.saveGlobal.defTab == 0 || _root.saveGlobal["breakTab" + _root.saveGlobal.defTab][type] == true) {
            let imp = _root.saveGlobal.defTab;
            b = 30;
            while (b >= 2) {
                _root["X" + imp + "breakNews" + b] = _root["X" + imp + "breakNews" + (b - 1)];
                _root["X" + imp + "breakStamp" + b] = _root["X" + imp + "breakStamp" + (b - 1)];
                _root["X" + imp + "breakColor" + b] = _root["X" + imp + "breakColor" + (b - 1)];
                b -= 1;
            }
            _root["X" + imp + "breakNews1"] = news;
            _root["X" + imp + "breakStamp1"] = "[" + _root.clock_display + "]";
            _root["X" + imp + "breakColor1"] = _root.saveGlobal.breakR[type] * 65536 + _root.saveGlobal.breakG[type] * 256 + _root.saveGlobal.breakB[type];
            _root.updateBreakNews = 1;
        }
    }
}