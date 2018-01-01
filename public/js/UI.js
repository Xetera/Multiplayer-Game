function updateSpeedIcon(player){

    let upgrade = player['availableUpgrades']['speedUpgrades'];
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


