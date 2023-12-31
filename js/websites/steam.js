const maxAttempt = 10;
let site = 0, attempt = 1;
const marketJSON = { skins: [], currency: null, updateTime: '000000' };

const startSteamSkins = async() => {
    const config = await getConfigData();
    if(!config?.active) return;
    const language = await getLanguageData(config?.lang);

    const langText = {
        name: "KEYDROP+",
        loading: language?.steam_loading,
        dsc_1: language?.steam_dsc_1,
        dsc_2: language?.steam_dsc_2,
        dsc_3: language?.steam_dsc_3,
        currencyError: language?.steam_currencyError,
        attemptTimeout: language?.steam_attemptTimeout,
        toManyTimeout: language?.steam_toManyTimeout
    };

    $('body').html(`<div id="bg"></div><div id="panel2"><h1>${langText?.name}</h1><h3>${langText?.loading}<a id="skin_count"></a></h3><div id="loading_bar"><div id="loading_bar_fill"></div></div><p>${langText?.dsc_1}<a href="https://steamcommunity.com">steamcommunity</a>${langText?.dsc_2}<br>${langText?.dsc_3}</p></div>`);
    loadSteamSkins(langText);
};

const loadSteamSkins = (langText) => {
    setTimeout(() => {
        const url = `https://steamcommunity.com/market/search/render/?appid=730&norender=1&currency=6&count=100&start=${site}`; 
        const cacheURL = url.split('?')[1];

        $.ajax({
            method: "GET",
            url,
            cacheURL,
            success: function (response, textStatus, jqXHR) {
                attempt = 1;
                if(response?.results?.length) {
                    const price_text = response?.results[0]?.sell_price_text;
                    if(!price_text?.includes('zł') && !price_text?.includes('$') && !price_text?.includes('€'))
                        return $('#skin_count').html(`<br><a style='color: darkred'>${langText?.currencyError}</a>`);
                }

                response?.results?.forEach(el => {
                    const skinData = { 
                        "name": `${el?.hash_name}`,
                        "price": el?.sell_price/100
                    };

                    marketJSON.skins.push(skinData);
                    $('#skin_count').text(`(${site}/${response?.total_count})`);
                    $('#loading_bar_fill').css({ width: `${(site*100)/response?.total_count}%` });
                });

                if(site < response?.total_count) {
                    site += response?.results?.length;
                    const price_text = response?.results[0]?.sell_price_text;
                    marketJSON.currency = price_text?.includes('zł') ? 'PLN' : price_text?.includes('$') ? 'USD' : 'EUR';
                    loadSteamSkins(langText);
                } else {
                    marketJSON.updateTime = `${new Date().getTime()}`;
                    try { chrome.storage.local.set({steamMarketJSON: marketJSON}); } catch(e) {};
                    setTimeout(() => {
                        try {
                            open(`https://key-drop.com/skin-changer`, '_self');
                        }
                        catch(e) {}
                    }, 4000);
                }
            },
            error: function() {
                $('#skin_count').html(`<br><a style='color: darkorange'>${langText?.attemptTimeout?.replace('{ATTEMPT}', attempt)?.replace('{MAXATTEMPT}', maxAttempt)}</a>`);
                if(attempt==20)
                    return $('#skin_count').html(`<br><a style='color: darkred'>${langText?.toManyTimeout}</a>`)
                setTimeout(() => {
                    attempt++;
                    loadSteamSkins(langText);
                }, 5 * 1000)
            }
        })
    }, 1 * 800)
};

startSteamSkins();