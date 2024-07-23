$( document ).ready(async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;

    waitForElm('div[data-testid="header-balance-div"]').then(async()=>{
        createTicketsInfo();
    });
});

const createTicketsInfo = async() => {
    const fetch = await fetchUrl('GET', 'https://key-drop.com/en/balance?battleTickets=1');
    const data = JSON.parse(fetch);
    const tickets = data?.caseBattleTickets; 

    $('div a[href="#gold-area"]').after($(document.createElement('a'))
        .addClass('min-w-[53px] cursor-pointer')
        .attr('href', '/case-battle/list')
        .html(`<span class="flex items-center gap-1 text-xs font-semibold tabular-nums" style="color: #77FF9D;"><svg class="icon flex-shrink-0 self-center h-9 w-12 sm:mr-3" viewBox="0 0 57.67 42" fill="currentColor" style="width: 14px; height: 14px; margin-right: 0px;"><path d="M19.97,39.53c.66,.66,1.03,1.55,1.03,2.47H55.33c.62,0,1.21-.25,1.65-.68,.44-.44,.68-1.03,.68-1.65v-12.83c-1.55,0-3.03-.61-4.12-1.71-1.09-1.09-1.71-2.58-1.71-4.12s.61-3.03,1.71-4.12c1.09-1.09,2.58-1.71,4.12-1.71V2.33c0-.62-.25-1.21-.68-1.65-.44-.44-1.03-.68-1.65-.68H21c0,.93-.37,1.82-1.03,2.47-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03c-.66-.66-1.03-1.55-1.03-2.47H2.33C1.71,0,1.12,.25,.68,.68c-.44,.44-.68,1.03-.68,1.65V39.67c0,.62,.25,1.21,.68,1.65,.44,.44,1.03,.68,1.65,.68H14c0-.93,.37-1.82,1.03-2.47,.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03Zm0-23.05c-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03-1.03-1.55-1.03-2.47,.37-1.82,1.03-2.47c.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03c.66,.66,1.03,1.55,1.03,2.47s-.37,1.82-1.03,2.47Zm0,14c-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03c-.66-.66-1.03-1.55-1.03-2.47s.37-1.82,1.03-2.47c.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03c.66,.66,1.03,1.55,1.03,2.47s-.37,1.82-1.03,2.47Z"></path></svg><span class="relative"><span data-testid="header-account-eventcoins-balance" class="absolute right-0">${tickets}</span><span class="pointer-events-none opacity-0">${tickets}</span></span></span>`)
    );

    $('div a[href="/#gold-area"]').after($(document.createElement('a'))
        .addClass('min-w-[53px] cursor-pointer')
        .attr('href', '/case-battle/list')
        .html(`<span class="flex items-center gap-1 text-xs font-semibold tabular-nums" style="color: #77FF9D;"><svg class="icon flex-shrink-0 self-center h-9 w-12 sm:mr-3" viewBox="0 0 57.67 42" fill="currentColor" style="width: 14px; height: 14px; margin-right: 0px;"><path d="M19.97,39.53c.66,.66,1.03,1.55,1.03,2.47H55.33c.62,0,1.21-.25,1.65-.68,.44-.44,.68-1.03,.68-1.65v-12.83c-1.55,0-3.03-.61-4.12-1.71-1.09-1.09-1.71-2.58-1.71-4.12s.61-3.03,1.71-4.12c1.09-1.09,2.58-1.71,4.12-1.71V2.33c0-.62-.25-1.21-.68-1.65-.44-.44-1.03-.68-1.65-.68H21c0,.93-.37,1.82-1.03,2.47-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03c-.66-.66-1.03-1.55-1.03-2.47H2.33C1.71,0,1.12,.25,.68,.68c-.44,.44-.68,1.03-.68,1.65V39.67c0,.62,.25,1.21,.68,1.65,.44,.44,1.03,.68,1.65,.68H14c0-.93,.37-1.82,1.03-2.47,.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03Zm0-23.05c-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03-1.03-1.55-1.03-2.47,.37-1.82,1.03-2.47c.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03c.66,.66,1.03,1.55,1.03,2.47s-.37,1.82-1.03,2.47Zm0,14c-.66,.66-1.55,1.03-2.47,1.03s-1.82-.37-2.47-1.03c-.66-.66-1.03-1.55-1.03-2.47s.37-1.82,1.03-2.47c.66-.66,1.55-1.03,2.47-1.03s1.82,.37,2.47,1.03c.66,.66,1.03,1.55,1.03,2.47s-.37,1.82-1.03,2.47Z"></path></svg><span class="relative"><span data-testid="header-account-eventcoins-balance" class="absolute right-0">${tickets}</span><span class="pointer-events-none opacity-0">${tickets}</span></span></span>`)
    );
}