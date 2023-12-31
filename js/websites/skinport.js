const availableCurrency = ["PLN", "USD", "EUR", "BRL", "GBP", "CZK"];
const urlParams = new URLSearchParams(window?.location?.search);
const currency = urlParams?.get('currency');

const url = `https://api.skinport.com/v1/items?app_id=730&currency=${currency}&tradable=0`;   
const cacheURL = url.split('?')[1];

const getSkins = async() => {
    const config = await getConfigData();
    if(!config?.active) return;
    const language = await getLanguageData(config?.lang);

    const langText = {
        name: "KEYDROP+",
        loading: language?.skinport_loading,
        currencyError: language?.skinport_currencyError,
        timeoutError: language?.skinport_timeoutError
    };

    $('body').html(`<div id="bg"></div><div id="panel"><h1>${langText?.name}</h1><h3>${langText?.loading}<a id="skin_count"></a></h3><div id="loading_bar"><div id="loading_bar_fill"></div></div></div>`);

    $.ajax({
        method: "GET",
        url,
        cacheURL,
        success: function (response, textStatus, jqXHR) {
            const marketJSON = { skins: [], currency: null, updateTime: '000000' };
            
            response?.forEach(async(el, i) => {
                if(el?.min_price) {
                    const skinData = { 
                            "name": `${el?.market_hash_name}`,
                            "price":  el?.min_price,
                            "slink": `${el?.item_page?.toString()?.slice(26)}` 
                        }
                    marketJSON.skins.push(skinData);
                }

                $('#skin_count').text(`(${i+1}/${response?.length})`);
                $('#loading_bar_fill').css({ width: `${((i+1)*100)/response?.length}%` });
            });

            marketJSON.currency = currency;
            marketJSON.updateTime = `${new Date().getTime()}`;
            try { chrome.storage.local.set({skinportMarketJSON: marketJSON }); } catch(e) {};
            setTimeout(function() {
                try {
                    open(`https://key-drop.com/skin-changer`, '_self');
                }
                catch(e) {}
            }, 4000);
        },
        error: function() {
            if(!availableCurrency?.includes(currency))
                return $('#skin_count').html(`<br> <a style="font-size: 15px">${langText?.currencyError}</a>`);
            return $('#skin_count').html(`<br> ${langText?.timeoutError}`);
        }
    });
};
getSkins();