waitForElm(`header.grid.items-center a[data-testid="home-btn"]`).then(() => {
    $(`[data-testid="home-btn"]`).on('click', async() => {
        try { window.open('https://key-drop.com/giveaways/list', '_self'); } catch(e) {};
    });
});