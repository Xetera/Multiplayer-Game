function updateSpeedIcon(player){

    let upgrade = player['availableUpgrades']['speedUpgrades'];
    // TODO: change this, we don't want to do ANY calculations on client side
    // it makes more sense if this just looks at a disabled: property from the server
    if (player.size > upgrade.cost && imgSpeedUpgrade.hasClass('disabled')){
        imgSpeedUpgrade.removeClass('disabled');

    }
    else if ((player.size < upgrade.cost) && !imgSpeedUpgrade.hasClass('disabled')){
        imgSpeedUpgrade.addClass('disabled')
    }
}

function updateStats(player){
    speedStatText.html(player.xSpeedDelta.toFixed(2));
    minSizeValue.html(player.minSize);
    maxSizeValue.html(player.maxSize);
    score.html(player.score);
    if (player.size % 1 !== 0){
        size.html(player.size.toFixed(2));
    }
    else {
        size.html(player.size);
    }
}


