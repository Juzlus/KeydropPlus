$( document ).ready(async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;
    const language = await getLanguageData(config?.lang);

    setTimeout(async() => {
        $(`button[data-testid="refill-deposit-button"]`)?.on('click', async() => {
            waitForElm('div.mt-5 button.button.button-light-green.h-13.text-lightgreen-100.ml-auto').then(()=>{
                createPromocodeButton(language?.paymentPromocode_useCode, true);
            });
        });
    }, 500);
    
    if(window?.location?.href?.includes('#payment/'))
        createPromocodeButton(language?.paymentPromocode_useCode, true);
});

const createPromocodeButton = async(lnagText, isFirst) => {
    setTimeout(async() => {
        if(isFirst)
            $(`li.aspect-\\[5\\/4\\]`)?.on('click', async() => {
                createPromocodeButton(lnagText, false);
            }); 

        $('button.button.button-light-green.h-13.text-lightgreen-100.ml-auto')?.eq(0)?.after($(document.createElement('span'))
            ?.addClass('button button-light-green h-13 text-lightgreen-100 sm:min-w-[110px] ml-auto')
            ?.css({ 'cursor': 'pointer', 'user-select': 'none' })
            ?.html(`<span>${lnagText}<br>JUZLUS</span>`)
            ?.on('click', async() => {
                await fetchUrl('POST', 'https://key-drop.com/pl/apiData/Bonus/promocode_activation_code', false, false, { promoCode: 'JUZLUS' });
                window?.location?.reload();
            })
        );
    }, 500);
};