const active = true;
const version = "F2.9";
const toastCooldown = 4 * 1000
const tokenExpiresTime = 90 * 1000;
const extensionName = "Keydrop+";
const expiresTime = (60 * 60 * 1000);
const githubUrl = `https://raw.githubusercontent.com/Juzlus/KeydropPlus/main/data`;
const errorText = "Something went wrong. Try again later!"

$('body').append($(document.createElement('div'))
    .addClass('toast-container js-toast-container')
    .css({ position: 'fixed', right: 0, 'margin-right': '-82px', 'margin-bottom': '-5px', bottom: 0, 'z-index': 999 })
);

const fetchUrl = async(type, url, token, noTime, data) => {
    try {
        const result = await $.ajax({
            type: type,
            url: `${url}${noTime ? '' : `?t=${new Date().getTime()}`}`,
            data: data ? JSON.stringify(data) : '',
            beforeSend: async (xhr) => {
                if(token)
                    xhr.setRequestHeader('authorization', `Bearer ${token}`);
            },
            success: function (response, textStatus, jqXHR) {
                if(!response) 
                    return createToast('error', 'error_fetch');
                return JSON.parse(JSON.stringify(response)) || undefined;
            },
            error: function(error) {
                return;
            }
        });
        return result;
    } catch(e) { if(e?.status == 403) return window?.location?.reload(); };
};

const getStorageData = async(type, name) => {
    try {
        const storageData = 
            (type === 'local' || type === 0) ? await chrome.storage.local.get([name]).then((result) => { return result[name]; })
                                    : await chrome.storage.sync.get([name]).then((result) => { return result[name] });
        return storageData;
    } catch(e) {
        return;// console.log(e);
    };
}

const getIndexData = async() => {
    const storageData = await getStorageData(1, 'index');
    if(storageData?.expires >= new Date().getTime()) return storageData;
    const fetch = await fetchUrl('GET', "https://key-drop.com/pl/apiData/Init/index");
    if(!fetch?.userName) return;
    const indexData = {
        username: fetch?.userName || 'Unknown',
        steamId: fetch?.steamId || `${new Date().getTime()}`,
        avatar: fetch?.avatar || null,
        expires: new Date().getTime() + expiresTime,
        currency: fetch?.currency,
        currencyRates: fetch?.rates || [{id: 'EUR', rate: 1}, {id: 'PLN', rate: 5}, {id: 'USD', rate: 1}, {id: 'UAH', rate: 36.5}, {id: 'BRL', rate: 5.13}, {id: 'ARS', rate: 175}, {id: 'GBP', rate: 0.89}, {id: 'CZK', rate: 25.5}]
    };
    try { chrome.storage.sync.set({ index: indexData }); } catch(e) {};
    return indexData;
};

const getConfigData = async() => {
    const storageData = await getStorageData(1, 'config');
    const configData = {
        lang: "auto",
        active: active,
        token: null,
        tokenExp: null,
        version: version,
        accountExp: null,
        steamPrice: false,
        skinportPrice: false,
        toastAutoHide: true,
        hideFavourite: false,
        hideCaseBattle: true,
        hideLiveDrop: true,
        showAllYoutuberCases: true,
        toastSoundEnable_error: true,
        toastSoundEnable_info: true,
        toastSoundEnable_success: true,
        toastSoundEnable_warning: true,   
    }
    const refreshedConfigData = await checkToken(storageData || configData);
    if(refreshedConfigData?.tokenExp && refreshedConfigData?.tokenExp > (new Date().getTime() + tokenExpiresTime)) {
        refreshedConfigData.token = null;
        refreshedConfigData.tokenExp = null;
        try { chrome.storage.sync.set({ config: refreshedConfigData }); } catch(e) {};
        createToast('warning', 'warning_dateManipulated');
    }
    return refreshedConfigData;
};

const checkToken = async(config) => {
    const timestamp = new Date().getTime();
    if(!config?.token || timestamp >= config?.tokenExp) {
        const fetch = await fetchUrl('GET', `https://key-drop.com/pl/token`);
        if(!fetch) return config;
        config.token = fetch;
        config.tokenExp = timestamp + tokenExpiresTime;
    }
    try { chrome.storage.sync.set({ config: config }); } catch(e) {};
    return config;
};


const getServerData = async() => {
    const fetch = JSON.parse(await fetchUrl('GET', `${githubUrl}/serverData.json`));
    if(!fetch || !fetch?.current_versions) return;
    return fetch;
};

const getLanguageData = async(lang) => {
    if (lang == "auto") {
        lang = "english";
        const pathnames = window.location?.pathname?.split('/');
        const server = await getServerData();

        if (pathnames.length >= 1 && server) {
            const pathlang = pathnames[1];
            lang = server?.languages?.find(el => el?.langCode == pathlang)?.langFileName || "english";
        }
    }

    const fetch = await fetchUrl('GET', `${githubUrl}/lang/${lang}.json`);
    if(!fetch || fetch?.length <= 0) return;
    const json = JSON.parse(fetch);
    return json;
};

const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '='))
            return cookie.substring(cookieName.length + 1);
    }
    return null;
}

const getCurrency = async() => {
    let currency = getCookieValue('currency');
    if (currency == null) {
        fetch = await fetchUrl('GET', 'https://key-drop.com/pl/balance?skinsValue=true');
        currency = JSON.parse(fetch)?.currency;
    }
    return currency || 'USD';
}

const getAutoGiveawayConfigData = async() => {
    const storageData = await getStorageData(1, 'autoGiveawayConfig');
    if(storageData) return storageData;
    const autoGiveawayConfigData = {
        active: false,
        winNotification: false,
        currentGiveaway: {
            id: null,
            deadlineTimestamp: null,
            haveIJoined: false,
            captcha: false
        },
    }
    try { chrome.storage.sync.set({ autoGiveawayConfig: autoGiveawayConfigData }); } catch(e) {};
    return autoGiveawayConfigData;
};

const getUserSkinsData = async(token) => {
    let currentPage = 1;
    let totalUserSkins = 1;
    let userSkinsArray = [];
    const totalMaxSkins = 999;

    do {
        const fetch = JSON.parse(await fetchUrl('GET', `https://key-drop.com/pl/panel/profil/my_winner_list?type=all&sort=newest&state=all&per_page=${totalMaxSkins}&current_page=${currentPage}?t=${new Date().getTime()}`, token));
        if(!fetch || !fetch?.total || fetch?.data?.length <= 0) return;
        totalUserSkins = fetch?.total || 1;
        if(currentPage == 1) userSkinsArray = fetch?.data;
        else userSkinsArray = [...userSkinsArray, ...fetch?.data];
        currentPage++;
    }
    while(currentPage <= Math.ceil(totalUserSkins/totalMaxSkins))
    return userSkinsArray;
};

const createToast = async(type, text, urlText, url, altText) => {
    const config = await getConfigData();
    const server = await getServerData();
    const language = await getLanguageData(config?.lang || 'english');

    const soundEnabled = 
        (type == "error" && config?.toastSoundEnable_error) ? true
        : (type == "info" && config?.toastSoundEnable_info) ? true
        : (type == "success" && config?.toastSoundEnable_success) ? true
        : (type == "warning" && config?.toastSoundEnable_warning) ? true
        : false;

    const imgColorClass = 
        (type == "error") ? "text-red-500"
        : (type == "info") ? "text-blue-500"
        : (type == "success") ? "text-lightgreen"
        : "text-gold-500";

    const borderColor = 
        (type == "error") ? "#5d2020 indianred"
        : (type == "info") ? "#20385d royalblue"
        : (type == "success") ? "#245d20 lightgreen"
        : "#5d4a20 gold";
    
    let langText = "UNDEFINED";
    
    try {
        langText = language[text];
    } catch {}; 

    const toast = await $(document.createElement('div'))
        .addClass(`toast toast-keydrop-plus z-[9999] flex w-screen origin-bottom overflow-hidden rounded border-y-2 border-l-2 border-r-4 bg-gradient-to-r py-6 pl-4 pr-14 md:w-auto md:max-w-lg md:origin-top-left border-y-red-500/20 border-l-red-500/20 border-r-red-500 from-[#46212A] via-[#261B21] to-[#18181D]" style="position: fixed; left: 1505px; top: 466px; transition-property: opacity, transform; transition-duration: 200ms;`)
        .attr({ 'tabindex': -1, 'data-time': new Date().getTime() })
        .css({ 'margin-top': '-10px', width: '495px', scale: '0.8',
            'border-top': `2px solid ${borderColor.split(' ')[0]}`,
            'border-left': `2px solid ${borderColor.split(' ')[0]}`,
            'border-right': `4px solid ${borderColor.split(' ')[1]}`,
            'border-bottom': `2px solid ${borderColor.split(' ')[0]}`,
            'background' : `linear-gradient(90deg, ${borderColor.split(' ')[0]} 49%, rgba(28,28,28,0) 89%)`
        })
        .html(`<audio id="toast_sound" preload="none" autoplay=''><source type='audio/mpeg' src="${soundEnabled ? `${githubUrl}${server?.soundsPath}toast_${type}.mp3?raw=true` : ''}"></source></audio><svg class="absolute -bottom-8 right-10 h-24 w-24 rotate-[30deg] opacity-10 ${imgColorClass}"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?44#toast-${type}"></use></svg><svg class="mr-2 h-11 w-11 flex-shrink-0 ${imgColorClass}"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?44#toast-${type}"></use></svg><div class="flex flex-col"><span class="text-xl font-bold leading-tight ${imgColorClass}">Keydrop+</span><p class="text-sm leading-6 text-navy-100">${altText || langText || errorText} <a href="${url}" style="text-decoration: underline">${urlText || ''}</a></p></div>`)
        .click(function() {
            const thisEl = $(this);
            thisEl.css({ "animation-name": "hideToast", "filter": "opacity(0)" })
            setTimeout(function() {
                thisEl.remove();
            }, 1 * 1000);
        })

    $('.toast-container.js-toast-container')
        .append(toast)
        .end();

    if(config?.toastAutoHide) {
        setTimeout(() => {
            toast.css({ "animation-name": "hideToast", "filter": "opacity(0)" })
            setTimeout(() => {
                toast.remove();
            }, 1 * 1000);
        }, 9 * 1000);
    }
};

const createNotifications = async(text, url, newTab) => {
    const permission = await Notification.requestPermission();
    if(permission == "denied") return;
    if(permission == "default") return Notification.requestPermission();

    const server = await getServerData();
    const notification = new Notification('Keydrop+', {
        body: text,
        icon: `${githubUrl}${server?.iconsPath}KD+_Icon.svg`,
        vibrate: true
    });

    if(!url) return;
    notification.addEventListener('click', () => {
        window.open(url, newTab ? '_blank' : '_self');
    });
};

const waitForElm = async(selector) => {
    return new Promise(resolve => {
        if(document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        };
        const observer = new MutationObserver(mutations => {
            if(document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};

const createWaterMark = async() => {
    $('head')
        .append($(document.createElement('meta'))
            .attr({ name: 'keydrop-plus', content: `v${version}` })
        ).end();
}

const showNav = async() => {
    await setTimeout(async () => {
        const server = await getServerData();
        $('img[alt="KeyDrop"]')
            .attr('src', `${githubUrl}${server?.iconsPath}Keydrop%2B_Icon.svg`)
            .css({ "animation-name": "show", "filter": "opacity(100)" })
            .end();

        $('nav[aria-label="Primary"]')
            .css({ "animation-name": "show2", "opacity": "1" })
            .find('div.flex.items-center.bg-\\[\\#23232D\\].rounded-xl.px-2')?.eq(0)
                .prepend($(document.createElement('a'))
                    ?.css('color', '#ff865a')
                    ?.addClass('cursor-pointer open-keydrop-plus-modal hidden items-center whitespace-nowrap px-2 py-5 text-2xs font-semibold uppercase transition-colors duration-200 hover:text-white lg:px-3 lg:text-[11px] text-lightgreen-200 md:flex')
                    ?.html(`<img src="${githubUrl}${server?.iconsPath}KD%2B_Icon.svg" style="height: 25px;width: 25px;margin-right: 8px; filter: invert(80%) sepia(46%) saturate(4942%) hue-rotate(322deg) brightness(103%) contrast(101%);"><span>${extensionName}</span>`)
                )
            .end();

        $('div.mr-2.flex.flex-col.items-start span.text-2xs.font-semibold.lg\\:text-xs')?.eq(0)?.html('<a href="/giveaways/list">GIVEAWAYS</a>')

        $(".open-keydrop-plus-modal").on('click', async() => {
            $('#keydrop-plus-modal')
                .addClass('is-open')
        });
    }, 1 * 1000);
}

createWaterMark();
showNav();

const verifyUser = async() => {
    const index = await getIndexData();
    const steamId = index?.steamId;

    const config = await getConfigData();
    const language = await getLanguageData(config?.lang);
    const langText = {
        mainText: language?.accessDenied_title,
        secondText: language?.accessDenied_desc,
        info: language?.accessDenied_info,
        serverName: language?.accessDenied_serverName,
        userName: language?.accessDenied_userName,
    };

    if(!steamId) {
        $('main')
            ?.css({ height: "100vh", width: '100vw', margin: 0, color: '#fff', overflow: 'hidden', display: 'flex', 'justify-content': 'center', 'flex-direction': 'column', 'align-items': 'center', position: 'relative', 'background-color': '#181e27', 'background-image': "url('https://github.com/Juzlus/KeydropPlus/blob/main/data/icons/background.png?raw=true')", 'background-size': 'cover', 'background-blend-mode': 'overlay', 'background-repeat': 'no-repeat', 'background-attachment': 'fixed', 'background-position': 'center' })
            ?.html(`<img src="https://raw.githubusercontent.com/Juzlus/KeydropPlus/44b3288883029e0722aa0d09c24a225651ea0550/data/icons/Keydrop%2B_Icon.svg" width="220px"><h1 id="keydropPlus_accessDenied" style="text-transform: uppercase;font-size: 60px;margin-bottom: 0;text-align: center;line-height: 1.2;">${langText?.mainText}</h1><p style="text-transform: uppercase;font-weight: 700;font-size: 14px;margin-bottom: 40px;margin-left: 10px;margin-right: 10px;text-align: center;">${language?.warning_mustLogin}</p><svg viewBox="0 0 24 24" fill="rgb(221, 177, 105)" style="width: 30px; height: 30px"> <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg><p style="max-width: 420px;text-align: center;line-height: 1;color: #B4B8CD;margin-left: 10px;margin-right: 10px;font-size: 14px;">${langText?.info?.split('|')[0]} <b>${langText?.userName}</b> ${langText?.info?.split('|')[1]} <span style="color: rgb(221, 177, 105); font-weight: 600"><a href="https://discord.gg/6XS4AXRKSB">${langText?.serverName}</a></span>.</p>`)
        return createToast('warning', 'warning_mustLogin');
    }

    function sha512(str) {
        return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
          return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
        });
      }
      
    const configData = await getConfigData();
    configData.active = true;
    chrome.storage.sync.set({ config: configData });
    return;
};
verifyUser();

//PROVABLY FAIR CONTENTS
function checkIBAN(iban) { 
    const parts = iban.match(/.{1,6}/g); 
    return parts.reduce((prev, curr) => Number(prev + curr) % 100000, ''); 
}

function convertBase(str, fromBase, toBase) {
    var digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    var outArray = [];
    var power = [1];
    for (var i = 0; i < digits.length; i++) {
        if (digits[i]) {
        outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase);
        }
        power = multiplyByNumber(fromBase, power, toBase);
    }

    var out = '';
    for (var i = outArray.length - 1; i >= 0; i--) {
        out += outArray[i].toString(toBase);
    }
    return out;
}

function parseToDigitsArray(str, base) {
    var digits = str.split('');
    var ary = [];
    for (var i = digits.length - 1; i >= 0; i--) {
        var n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
    }
    return ary;
}

function multiplyByNumber(num, x, base) {
    if (num < 0) return null;
    if (num == 0) return [];

    var result = [];
    var power = x;
    while (true) {
        if (num & 1) {
        result = add(result, power, base);
        }
        num = num >> 1;
        if (num === 0) break;
        power = add(power, power, base);
    }

    return result;
}

function add(x, y, base) {
    var z = [];
    var n = Math.max(x.length, y.length);
    var carry = 0;
    var i = 0;
    while (i < n || carry) {
        var xi = i < x.length ? x[i] : 0;
        var yi = i < y.length ? y[i] : 0;
        var zi = carry + xi + yi;
        z.push(zi % base);
        carry = Math.floor(zi / base);
        i++;
    }
    return z;
}