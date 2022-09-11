"use strict";
document.onmousemove = (e) => {
    handleHeadMove(e.x, e.y);
    handleMouthMove(e.x, e.y);
    handleEarsMove(e.x, e.y);
    handleEyesMove(e.x, e.y);
};
let headElement = document.querySelector(".head");
let mouthElement = document.querySelector(".mouth");
let earsElement = document.querySelector(".ears");
let eyesElement = document.querySelector(".eyes");
let leftEdgeX = window.innerWidth / 2 - headElement.clientWidth / 2;
let rightEdgeX = window.innerWidth / 2 + headElement.clientWidth / 2;
let topEdgeY = headElement.getBoundingClientRect().top;
let bottomEdgeY = headElement.getBoundingClientRect().top + headElement.clientWidth * 2;
let centerX = (leftEdgeX + rightEdgeX) / 2;
headElement.style.borderTopLeftRadius = `${headElement.clientWidth}px`;
headElement.style.borderTopRightRadius = `${headElement.clientWidth}px`;
window.onresize = (e) => {
    leftEdgeX = document.body.clientWidth / 2 - headElement.clientWidth / 2;
    rightEdgeX = document.body.clientWidth / 2 + headElement.clientWidth / 2;
    topEdgeY = headElement.getBoundingClientRect().top;
    bottomEdgeY =
        headElement.getBoundingClientRect().top + headElement.clientWidth * 2;
    headElement.style.borderTopLeftRadius = `${headElement.clientWidth}px`;
    headElement.style.borderTopRightRadius = `${headElement.clientWidth}px`;
};
let deviationAlpha = 3;
function handleHeadMove(mouseX, mouseY) {
    if (mouseX >= leftEdgeX && mouseX <= centerX) {
        let coef = calcXCoefficient(centerX, deviationAlpha, leftEdgeX, mouseX);
        setRotationToElement(headElement, -coef);
    }
    else if (mouseX >= centerX && mouseX <= rightEdgeX) {
        let coef = calcXCoefficient(centerX, deviationAlpha, rightEdgeX, mouseX);
        setRotationToElement(headElement, coef);
    }
    else if (mouseX <= centerX) {
        setRotationToElement(headElement, -deviationAlpha);
    }
    else if (mouseX >= centerX) {
        setRotationToElement(headElement, deviationAlpha);
    }
}
let marginLeftCoefficient = 60;
let marginTopCoefficient = 16;
function handleMouthMove(mouseX, mouseY) {
    if (mouseX >= leftEdgeX && mouseX <= centerX) {
        let coef = calcXCoefficient(centerX, marginLeftCoefficient, leftEdgeX, mouseX);
        setMarginLeftToElement(mouthElement, -coef);
    }
    else if (mouseX >= centerX && mouseX <= rightEdgeX) {
        let coef = calcXCoefficient(centerX, marginLeftCoefficient, rightEdgeX, mouseX);
        setMarginLeftToElement(mouthElement, coef);
    }
    else if (mouseX <= centerX) {
        setMarginLeftToElement(mouthElement, -marginLeftCoefficient);
    }
    else if (mouseX >= centerX) {
        setMarginLeftToElement(mouthElement, marginLeftCoefficient);
    }
    if (mouseY <= topEdgeY) {
        mouthElement.style.marginTop = `${-marginTopCoefficient}px`;
    }
    else if (mouseY >= topEdgeY && mouseY <= bottomEdgeY) {
        let coef = calcYCoefficient(marginTopCoefficient, topEdgeY, bottomEdgeY, mouseY);
        mouthElement.style.marginTop = `${coef}px`;
    }
    else if (mouseY >= bottomEdgeY) {
        mouthElement.style.marginTop = `${marginTopCoefficient}px`;
    }
}
let marginTopCoefficientEar = 8;
let marginLeftCoefficientEar = 10;
function handleEarsMove(mouseX, mouseY) {
    if (mouseX <= leftEdgeX) {
        setTransformToElement(earsElement, marginLeftCoefficientEar);
    }
    else if (mouseX >= leftEdgeX && mouseX <= rightEdgeX) {
        let coefEar = calcYCoefficient(marginLeftCoefficientEar, leftEdgeX, rightEdgeX, mouseX);
        setTransformToElement(earsElement, -coefEar);
    }
    else if (mouseX >= rightEdgeX) {
        setTransformToElement(earsElement, -marginLeftCoefficientEar);
    }
    if (mouseY <= topEdgeY) {
        earsElement.style.marginTop = `${marginTopCoefficientEar}px`;
    }
    else if (mouseY >= topEdgeY && mouseY <= bottomEdgeY) {
        let coefEar = calcYCoefficient(marginTopCoefficientEar, topEdgeY, bottomEdgeY, mouseY);
        earsElement.style.marginTop = `${-coefEar}px`;
    }
    else if (mouseY >= bottomEdgeY) {
        earsElement.style.marginTop = `${-marginTopCoefficientEar}px`;
    }
}
let marginLeftCoefficientEye = 30;
let marginTopCoefficientEye = 20;
function handleEyesMove(mouseX, mouseY) {
    if (mouseX <= leftEdgeX) {
        setMarginLeftToElement(eyesElement, -marginLeftCoefficientEye);
    }
    else if (mouseX >= leftEdgeX && mouseX <= rightEdgeX) {
        let coefEar = calcYCoefficient(marginLeftCoefficientEye, leftEdgeX, rightEdgeX, mouseX);
        setMarginLeftToElement(eyesElement, coefEar);
    }
    else if (mouseX >= rightEdgeX) {
        setMarginLeftToElement(eyesElement, marginLeftCoefficientEye);
    }
    if (mouseY <= topEdgeY) {
        eyesElement.style.marginTop = `${-marginTopCoefficientEye}px`;
    }
    else if (mouseY >= topEdgeY && mouseY <= bottomEdgeY) {
        let coefEar = calcYCoefficient(marginTopCoefficientEye, topEdgeY, bottomEdgeY, mouseY);
        eyesElement.style.marginTop = `${coefEar}px`;
    }
    else if (mouseY >= bottomEdgeY) {
        eyesElement.style.marginTop = `${marginTopCoefficientEye}px`;
    }
}
function setRotationToElement(element, alpha) {
    element.style.transform = `translate(-50%, 10%) rotate(${alpha}deg)`;
}
function setMarginLeftToElement(element, margin) {
    element.style.marginLeft = `${margin}px`;
}
function setTransformToElement(element, position) {
    element.style.transform = `translate(${position}px, 0)`;
}
function calcXCoefficient(center, amount, edge, mouseX) {
    let coeffient = (-amount / (center - edge)) * mouseX + (amount * center) / (center - edge);
    return coeffient;
}
function calcYCoefficient(amount, top, bottom, mouseY) {
    let coeffient = ((2 * amount) / (bottom - top)) * mouseY +
        (amount * (top + bottom)) / (top - bottom);
    return coeffient;
}
