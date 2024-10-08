"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ScratchCard;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _howtoplay = _interopRequireDefault(require("../assets/icons/howtoplay.png"));
var _howtowin = _interopRequireDefault(require("../assets/icons/howtowin.png"));
var _ticketsIcon = _interopRequireDefault(require("../assets/icons/tickets-icon.png"));
var _winnings = _interopRequireDefault(require("../assets/icons/winnings.png"));
var _success = _interopRequireDefault(require("../assets/icons/success.png"));
var _scratchLogo = _interopRequireDefault(require("../assets/icons/scratchLogo.png"));
var _priceIcon = _interopRequireDefault(require("../assets/icons/priceIcon.png"));
var _flares = _interopRequireDefault(require("../assets/icons/flares.png"));
var _Loader = _interopRequireDefault(require("./Loader"));
require("../App.css");
var _reactConfetti = _interopRequireDefault(require("react-confetti"));
var _winningSound = _interopRequireDefault(require("../assets/sounds/winning-sound.mp3"));
var _loosingSound = _interopRequireDefault(require("../assets/sounds/loosing-sound.mp3"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ScratchCard(_ref) {
  var winnerConditions = _ref.winnerConditions,
    winningValues = _ref.winningValues,
    currency = _ref.currency,
    cardContainer = _ref.cardContainer,
    priceIcon = _ref.priceIcon,
    gameLogo = _ref.gameLogo,
    isFlares = _ref.isFlares,
    rules = _ref.rules,
    scratchedBg = _ref.scratchedBg,
    bottomImage = _ref.bottomImage,
    scratchArea = _ref.scratchArea,
    apiEndpoint = _ref.apiEndpoint,
    tropheeObject = _ref.tropheeObject,
    tropheeImage = _ref.tropheeImage,
    token = _ref.token,
    scratchType = _ref.scratchType,
    btnsStyle = _ref.btnsStyle,
    mainColor = _ref.mainColor,
    logoPosition = _ref.logoPosition,
    pricePosition = _ref.pricePosition,
    gameLogoPosition = _ref.gameLogoPosition,
    bottomImagePosition = _ref.bottomImagePosition,
    scratchPosition = _ref.scratchPosition,
    mobileCentered = _ref.mobileCentered;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    activeMenu = _useState2[0],
    setActiveMenu = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    count = _useState4[0],
    setCount = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    activeDialog = _useState6[0],
    setActiveDialog = _useState6[1];
  var _useState7 = (0, _react.useState)(true),
    _useState8 = _slicedToArray(_useState7, 2),
    loader = _useState8[0],
    setLoader = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    returnMessage = _useState10[0],
    setReturnMessage = _useState10[1];
  var _useState11 = (0, _react.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    availableTickets = _useState12[0],
    setAvailableTickets = _useState12[1];
  var _useState13 = (0, _react.useState)(0),
    _useState14 = _slicedToArray(_useState13, 2),
    targetScore = _useState14[0],
    setTargetScore = _useState14[1];
  var _useState15 = (0, _react.useState)(0),
    _useState16 = _slicedToArray(_useState15, 2),
    ticketId = _useState16[0],
    setTicketId = _useState16[1];
  var _useState17 = (0, _react.useState)([]),
    _useState18 = _slicedToArray(_useState17, 2),
    myArray = _useState18[0],
    setMyArray = _useState18[1];
  var _useState19 = (0, _react.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    winningValue = _useState20[0],
    setWinningValue = _useState20[1];
  var _useState21 = (0, _react.useState)([]),
    _useState22 = _slicedToArray(_useState21, 2),
    tickets = _useState22[0],
    setTickets = _useState22[1];
  var _useState23 = (0, _react.useState)([]),
    _useState24 = _slicedToArray(_useState23, 2),
    winningTickets = _useState24[0],
    setWinningTickets = _useState24[1];
  var _useState25 = (0, _react.useState)([]),
    _useState26 = _slicedToArray(_useState25, 2),
    valuesArray = _useState26[0],
    setValuesArray = _useState26[1];
  var _useState27 = (0, _react.useState)(null),
    _useState28 = _slicedToArray(_useState27, 2),
    isWinning = _useState28[0],
    setIsWinning = _useState28[1];
  var _useState29 = (0, _react.useState)(false),
    _useState30 = _slicedToArray(_useState29, 2),
    loadReplay = _useState30[0],
    setLoadReplay = _useState30[1];
  var _useState31 = (0, _react.useState)(''),
    _useState32 = _slicedToArray(_useState31, 2),
    score = _useState32[0],
    setScore = _useState32[1];
  var _useState33 = (0, _react.useState)('hidden'),
    _useState34 = _slicedToArray(_useState33, 2),
    scoreState = _useState34[0],
    setScoreState = _useState34[1];
  var canvasRef = (0, _react.useRef)(null);
  var ctxRef = (0, _react.useRef)(null);
  var overlayClearedRef = (0, _react.useRef)(false);
  var isDrawingRef = (0, _react.useRef)(false);
  var dialogRef = (0, _react.useRef)(null);
  var playButtonRef = (0, _react.useRef)(null);
  var replayButtonRef = (0, _react.useRef)(null);
  var winningAudioRef = (0, _react.useRef)(new Audio(_winningSound["default"]));
  var loosingAudioRef = (0, _react.useRef)(new Audio(_loosingSound["default"]));
  var handleAdd = function handleAdd() {
    return setCount(count + 1);
  };
  var handleRemove = function handleRemove() {
    return setCount(count > 0 ? count - 1 : 0);
  };
  var toggleButtonVisibility = function toggleButtonVisibility(buttonRef, shouldShow) {
    if (buttonRef.current) {
      buttonRef.current.style.display = shouldShow ? 'block' : 'none';
    }
  };
  var openDialog = function openDialog(dialogName) {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setActiveDialog(dialogName);
    setTimeout(function () {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    }, 0);
  };
  var closeDialog = function closeDialog() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setActiveDialog(null);
  };
  (0, _react.useEffect)(function () {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    var pixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * pixelRatio;
    canvas.height = canvas.clientHeight * pixelRatio;
    var scratchImage = new Image();
    scratchImage.src = scratchArea;
    scratchImage.onload = function () {
      createTexture(ctx, scratchImage, canvas);
    };
  }, []);
  var createTexture = function createTexture(ctx, scratchImage, canvas) {
    canvas.width = scratchImage.width;
    canvas.height = scratchImage.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(scratchImage, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
  };
  var handleMouseDown = function handleMouseDown() {
    if (availableTickets > 0 && !overlayClearedRef.current) {
      isDrawingRef.current = true;
    }
  };
  var handleMouseUp = function handleMouseUp() {
    if (availableTickets > 0 && !overlayClearedRef.current) {
      isDrawingRef.current = false;
      checkIfRevealed();
    }
  };
  var handleMouseMove = function handleMouseMove(e) {
    var canvas = canvasRef.current;
    var bounds = canvas.getBoundingClientRect();
    var scaleX = canvas.width / bounds.width;
    var scaleY = canvas.height / bounds.height;
    if (availableTickets > 0 && !overlayClearedRef.current && isDrawingRef.current) {
      var x = (e.clientX - bounds.left) * scaleX;
      var y = (e.clientY - bounds.top) * scaleY;
      clearOverlay(x, y);
      checkIfRevealed();
    }
  };
  var handleTouchStart = function handleTouchStart(e) {
    e.preventDefault();
    if (availableTickets > 0 && !overlayClearedRef.current) {
      isDrawingRef.current = true;
    }
  };
  var handleTouchEnd = function handleTouchEnd(e) {
    e.preventDefault();
    if (availableTickets > 0 && !overlayClearedRef.current) {
      isDrawingRef.current = false;
      checkIfRevealed();
    }
  };
  var handleTouchMove = function handleTouchMove(e) {
    e.preventDefault();
    var canvas = canvasRef.current;
    var bounds = canvas.getBoundingClientRect();
    var scaleX = canvas.width / bounds.width;
    var scaleY = canvas.height / bounds.height;
    if (availableTickets > 0 && !overlayClearedRef.current && isDrawingRef.current) {
      var touch = e.touches[0];
      var x = (touch.clientX - bounds.left) * scaleX;
      var y = (touch.clientY - bounds.top) * scaleY;
      clearOverlay(x, y);
      checkIfRevealed();
    }
  };
  var clearOverlay = function clearOverlay(x, y) {
    var ctx = ctxRef.current;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };
  var checkIfRevealed = function checkIfRevealed() {
    var canvas = canvasRef.current;
    var ctx = ctxRef.current;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    var transparentPixels = 0;
    for (var i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }
    var totalPixels = canvas.width * canvas.height;
    var revealPercentage = transparentPixels / totalPixels;
    if (revealPercentage >= 0.5) {
      clearCanvas();
    }
  };
  var clearCanvas = function clearCanvas() {
    var canvas = canvasRef.current;
    var ctx = ctxRef.current;
    overlayClearedRef.current = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playTicket(ticketId);
    toggleButtonVisibility(playButtonRef, false);
    if (winningValue !== 'losing') {
      startWinningAnimation(targetScore);
    } else {
      startLoosingAnimation();
    }
  };
  (0, _react.useEffect)(function () {
    fetchDataFromAPI();
    toggleButtonVisibility(playButtonRef, false);
    toggleButtonVisibility(replayButtonRef, false);
  }, []);
  function onBuyScratch() {
    setLoader(true);
    var url = "".concat(apiEndpoint, "scratch-api/tickets?isWallet=true&language=en");
    var body = {
      token: token,
      type: scratchType,
      numberOfTickets: count,
      gameType: scratchType
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error! status: ".concat(response.status));
      }
      return response.json();
    }).then(function (data) {
      setLoader(false);
      window.top.postMessage("called", "*");
      setCount(0);
      if (data.status === 0) {
        setReturnMessage(data.message);
        openDialog('returnDialog');
      } else {
        getUnplayed();
      }
      if (availableTickets === 0 && !overlayClearedRef.current) {
        console.log("entered");
        fetchDataFromAPI();
      }
    })["catch"](function (error) {
      setLoader(false);
      console.error("Fetch error:", error.message);
    });
  }
  function getUnplayed() {
    setLoader(true);
    var pagesize = 1000;
    var pagenb = "0&isFinished=0";
    var url = "".concat(apiEndpoint, "scratch-api/tokens/").concat(token, "/tickets?Type=").concat(scratchType, "&PageNumber=").concat(pagenb, "&PageSize=").concat(pagesize);
    fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error! status: ".concat(response.status));
      }
      return response.json();
    }).then(function (data) {
      setLoader(false);
      if (data.status === 1 && data.tickets !== null) {
        console.log(data.numberOfTickets);
        setAvailableTickets(data.numberOfTickets);
        if (data.numberOfTickets > 0 && overlayClearedRef.current) {
          toggleButtonVisibility(replayButtonRef, true);
        }
      } else {
        console.error(data);
      }
    })["catch"](function (error) {
      setLoader(false);
      console.error("Error:", error.message);
    });
  }
  function fetchDataFromAPI() {
    setLoader(true);
    if (token) {
      var pagesize = 1000;
      var pagenb = "0&isFinished=0";
      var url = "".concat(apiEndpoint, "scratch-api/tokens/").concat(token, "/tickets?Type=").concat(scratchType, "&PageNumber=").concat(pagenb, "&PageSize=").concat(pagesize);
      fetch(url).then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error! status: ".concat(response.status));
        }
        return response.json();
      }).then(function (data) {
        setLoader(false);
        if (data.status === 1 && data.tickets.length > 0) {
          if (data.numberOfTickets > 0 && !overlayClearedRef.current) {
            toggleButtonVisibility(playButtonRef, true);
          }
          setTargetScore(data.tickets[0].prize);
          setTicketId(data.tickets[0].id);
          setMyArray(data.tickets[0].ticketValues);
          setWinningValue(data.tickets[0].winningValue);
          setAvailableTickets(data.numberOfTickets);
          createValuesArray(data.tickets[0].ticketValues);
        } else {
          console.error(data);
        }
      })["catch"](function (error) {
        setLoader(false);
        console.error("Error:", error.message);
      });
    } else {
      setLoader(false);
      console.error("Token is not provided");
    }
  }
  function getInfos() {
    setLoader(true);
    var pagesize = 1000;
    var pagenb = 0;
    var url = "".concat(apiEndpoint, "scratch-api/tokens/").concat(token, "/tickets?Type=").concat(scratchType, "&PageNumber=").concat(pagenb, "&PageSize=").concat(pagesize);
    fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error! status: ".concat(response.status));
      }
      return response.json();
    }).then(function (data) {
      setLoader(false);
      if (data.tickets) {
        var filteredTickets = data.tickets.filter(function (item) {
          return item.ticketState !== "PENDING";
        });
        setTickets(filteredTickets);
        openDialog('ticketsDialog');
      } else {
        setReturnMessage(data.message);
        openDialog('returnDialog');
      }
    })["catch"](function (error) {
      setLoader(false);
      console.error("Error:", error.message);
    });
  }
  function getWinningsInfos() {
    setLoader(true);
    var pagesize = 1000;
    var pagenb = 0;
    var url = "".concat(apiEndpoint, "scratch-api/tokens/").concat(token, "/tickets?Type=").concat(scratchType, "&isFinished=1&isWinning=true&PageNumber=").concat(pagenb, "&PageSize=").concat(pagesize);
    fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error! status: ".concat(response.status));
      }
      return response.json();
    }).then(function (data) {
      setLoader(false);
      if (data.tickets) {
        var filteredTickets = data.tickets.filter(function (item) {
          return item.ticketState !== "PENDING";
        });
        setWinningTickets(filteredTickets);
        openDialog('winningsDialog');
      } else {
        setReturnMessage(data.message);
        openDialog('returnDialog');
      }
    })["catch"](function (error) {
      setLoader(false);
      console.error("Error:", error.message);
    });
  }
  function playTicket(ticketId) {
    console.log("called");
    // setLoader(true);
    setLoadReplay(true);
    var body = {
      token: token,
      gameType: scratchType,
      ticketId: ticketId
    };
    fetch("".concat(apiEndpoint, "scratch-api/tickets?language=en"), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error! status: ".concat(response.status));
      }
      return response.json();
    }).then(function (data) {
      setLoadReplay(false);
      window.top.postMessage("called", "*");
      getUnplayed(scratchType);
    })["catch"](function (error) {
      setLoadReplay(false);
      console.error("Error:", error.message);
    });
  }
  function createValuesArray(values) {
    var valuesOnly = values.map(function (obj, index) {
      if (obj.value === tropheeObject) {
        return {
          type: 'image',
          src: tropheeImage
        };
      } else {
        return {
          type: 'text',
          value: obj.value
        };
      }
    });
    setValuesArray(valuesOnly);
  }
  function playAgainFct() {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    var scratchImage = new Image();
    scratchImage.src = scratchArea;
    scratchImage.onload = function () {
      createTexture(ctx, scratchImage, canvas);
    };
    overlayClearedRef.current = false;
    fetchDataFromAPI();
    toggleButtonVisibility(replayButtonRef, false);
    if (winningValue !== "losing") {
      stopWinningAnimation();
    } else {
      stopLoosingAnimation();
    }
  }
  function startWinningAnimation(score) {
    setScore("".concat('Vous avez Gagnez' + "\n" + score, " ").concat(currency));
    setScoreState('');
    winningAudioRef.current.play();
    setIsWinning(true);
  }
  function startLoosingAnimation() {
    loosingAudioRef.current.play();
  }
  function stopWinningAnimation() {
    winningAudioRef.current.pause();
    winningAudioRef.current.currentTime = 0;
    setIsWinning(null);
    setScore('');
    setScoreState('hidden');
  }
  function stopLoosingAnimation() {
    loosingAudioRef.current.pause();
    loosingAudioRef.current.currentTime = 0;
  }
  var getPositionStyle = function getPositionStyle(position) {
    switch (position) {
      case 'bottomleft':
        return 'auto auto 20px 20px';
      case 'bottomright':
        return 'auto 20px 20px auto';
      case 'topleft':
        return '20px auto auto 20px';
      case 'topright':
        return '20px 20px auto auto';
      case 'center':
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
      default:
        return position;
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bottomContainer",
    style: {
      backgroundColor: mainColor
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "inside-content"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "scratch-menu"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "burger-menu ".concat(activeMenu ? 'burger-active' : ''),
    onClick: function onClick() {
      return setActiveMenu(!activeMenu);
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "item",
    style: {
      backgroundColor: btnsStyle
    }
  }), /*#__PURE__*/_react["default"].createElement("i", {
    className: "item",
    style: {
      backgroundColor: btnsStyle
    }
  }), /*#__PURE__*/_react["default"].createElement("i", {
    className: "item",
    style: {
      backgroundColor: btnsStyle
    }
  })), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "menu-content ".concat(activeMenu ? 'burger-active' : ''),
    style: {
      backgroundColor: mainColor
    }
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-item",
    onClick: function onClick() {
      return openDialog('howToPlayDialog');
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _howtoplay["default"],
    className: "button-image",
    alt: "menuIcon"
  })), /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-item tickets-item",
    onClick: getInfos
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _ticketsIcon["default"],
    className: "button-image",
    alt: "menuIcon"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-loader ticket-loader"
  })), /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-item tickets-item",
    onClick: getWinningsInfos
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _winnings["default"],
    className: "button-image",
    alt: "menuIcon"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ticket-loader"
  })), /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-item",
    onClick: function onClick() {
      return openDialog('howToWinDialog');
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _howtowin["default"],
    className: "button-image",
    alt: "menuIcon"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "counter-tickets"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "ticketBtn minusbtn",
    onClick: handleRemove,
    style: {
      backgroundColor: btnsStyle
    }
  }, "-"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ticket-container",
    style: {
      backgroundColor: btnsStyle
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "countTickets"
  }, count)), /*#__PURE__*/_react["default"].createElement("button", {
    className: "ticketBtn plusbtn",
    onClick: handleAdd,
    style: {
      backgroundColor: btnsStyle
    }
  }, "+"), /*#__PURE__*/_react["default"].createElement("button", {
    className: "purchaseBtn",
    style: {
      backgroundColor: btnsStyle
    },
    onClick: onBuyScratch
  }, "acheter"), /*#__PURE__*/_react["default"].createElement("img", {
    src: _success["default"],
    className: "sucessIcon hidden",
    alt: "menuIcon"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "small-areaContainer",
    style: {
      backgroundColor: btnsStyle
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "tickets-text-mobile"
  }, "Billets"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ticket-inside"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    id: "availableTickets"
  }, availableTickets))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "cardContainer",
    id: "card-container",
    style: {
      backgroundImage: "url(".concat(cardContainer, ")")
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "class": "action-btns"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    "class": "actionbtn actionbtn1",
    onClick: clearCanvas,
    ref: playButtonRef,
    style: {
      backgroundColor: btnsStyle
    }
  }, "grattez"), /*#__PURE__*/_react["default"].createElement("button", {
    "class": "actionbtn actionbtn2",
    id: "playAgainButton",
    onClick: playAgainFct,
    ref: replayButtonRef,
    style: {
      backgroundColor: btnsStyle
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    id: "replay-label"
  }, "rejouer")), loadReplay && /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-loader"
  })), isFlares && /*#__PURE__*/_react["default"].createElement("img", {
    className: "cardContainer__flares",
    alt: "top flares",
    src: _flares["default"]
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "cardContainer-content"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "cardContainer-header"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _scratchLogo["default"],
    className: "scratch-logo",
    alt: "scratch logo",
    style: {
      inset: getPositionStyle(logoPosition)
    }
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: priceIcon,
    className: "price-icon",
    alt: "price logo",
    style: {
      inset: getPositionStyle(pricePosition)
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "cardContainer-internalContent"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: gameLogo,
    className: "game-logo ".concat(gameLogoPosition),
    alt: "game logo"
  }), rules ? /*#__PURE__*/_react["default"].createElement("p", {
    className: "cardContainer__rules"
  }, rules) : ''), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scoringContainer"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "confetti-container"
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: bottomImage,
    className: "cardContainer_bottomImg",
    style: {
      inset: getPositionStyle(bottomImagePosition)
    },
    alt: "bottom img"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scratch-card " + [mobileCentered && "mobilecentered"],
    style: {
      backgroundImage: "url(".concat(scratchedBg, ")"),
      inset: getPositionStyle(scratchPosition)
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "main-flower"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "arrayContainer"
  }, valuesArray.map(function (item, index) {
    if (item.type === 'image') {
      return /*#__PURE__*/_react["default"].createElement("img", {
        key: index,
        src: item.src,
        alt: "Trophy",
        className: "value-item"
      });
    } else if (item.type === 'text') {
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: index,
        className: "value-item"
      }, item.value);
    }
    return null;
  })), /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: canvasRef,
    className: "scratch-area",
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove
  })))), /*#__PURE__*/_react["default"].createElement("dialog", {
    ref: dialogRef,
    className: "dialogWrapper",
    style: {
      backgroundColor: mainColor
    }
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "close-btn",
    onClick: closeDialog,
    style: {
      backgroundColor: btnsStyle
    }
  }, "x"), activeDialog === 'returnDialog' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "winning-value"
  }, returnMessage), activeDialog === 'ticketsDialog' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "insideDialog"
  }, /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", null, "ID"), /*#__PURE__*/_react["default"].createElement("th", null, "Date d'achat"), /*#__PURE__*/_react["default"].createElement("th", null, "Achats"))), /*#__PURE__*/_react["default"].createElement("tbody", null, tickets.map(function (ticket) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: ticket.id
    }, /*#__PURE__*/_react["default"].createElement("td", null, ticket.id), /*#__PURE__*/_react["default"].createElement("td", null, ticket.purchaseDate), /*#__PURE__*/_react["default"].createElement("td", null, ticket.price));
  })))), activeDialog === 'winningsDialog' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "insideDialog"
  }, /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", null, "ID"), /*#__PURE__*/_react["default"].createElement("th", null, "Date d'achat"), /*#__PURE__*/_react["default"].createElement("th", null, "Achats"))), /*#__PURE__*/_react["default"].createElement("tbody", null, winningTickets.map(function (ticket) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: ticket.id
    }, /*#__PURE__*/_react["default"].createElement("td", null, ticket.id), /*#__PURE__*/_react["default"].createElement("td", null, ticket.purchaseDate), /*#__PURE__*/_react["default"].createElement("td", null, ticket.price));
  })))), activeDialog === 'howToPlayDialog' && /*#__PURE__*/_react["default"].createElement("div", null, winnerConditions && winnerConditions.map(function (value, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "howToPlay-conditions"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "tag-container"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "tag-number"
    }, index + 1)), /*#__PURE__*/_react["default"].createElement("span", {
      className: "howToPlay-content"
    }, value.content));
  })), activeDialog === 'howToWinDialog' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "howToWin-conditions"
  }, winningValues && winningValues.map(function (value, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "winning-block"
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: value.image,
      alt: "value icon",
      className: "winning-img"
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "winning-value"
    }, value.prize, ' ' + currency));
  }), winningValues && winningValues.length > 0 ? '' : /*#__PURE__*/_react["default"].createElement("span", {
    className: "winning-value"
  }, "Trouvez 3 montant identiques et gagnez le montant associ\xE9"))), loader && /*#__PURE__*/_react["default"].createElement(_Loader["default"], null), isWinning && /*#__PURE__*/_react["default"].createElement(_reactConfetti["default"], {
    width: window.innerWidth,
    height: window.innerHeight
  }));
}
ScratchCard.propTypes = {
  bottomContainerStyle: _propTypes["default"].object,
  menuContentStyle: _propTypes["default"].object,
  buyButton: _propTypes["default"].object,
  ticketBtn: _propTypes["default"].object,
  ticketCount: _propTypes["default"].object,
  dialogStyle: _propTypes["default"].object,
  burgerMenu: _propTypes["default"].object,
  winnerConditions: _propTypes["default"].object,
  winningValues: _propTypes["default"].object,
  cardContainer: _propTypes["default"].object,
  replayButton: _propTypes["default"].object,
  scratchAllButton: _propTypes["default"].object,
  mainColor: _propTypes["default"].object,
  btnsStyle: _propTypes["default"].object
};
ScratchCard.defaultProps = {
  bottomContainerStyle: {},
  menuContentStyle: {},
  buyButton: {},
  ticketBtn: {},
  ticketCount: {},
  dialogStyle: {},
  burgerMenu: {},
  winnerConditions: [],
  winningValues: [],
  currency: '',
  cardContainer: '',
  priceIcon: _priceIcon["default"],
  gameLogo: '',
  isFlares: false,
  rules: '',
  scratchedBg: '',
  bottomImage: '',
  apiEndpoint: '',
  tropheeObject: '',
  tropheeImage: '',
  replayButton: {},
  scratchAllButton: {},
  mainColor: '',
  btnsStyle: ''
};