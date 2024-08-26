import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import HowToPlayIcon from '../assets/icons/howtoplay.png';
import HowToWinIcon from '../assets/icons/howtowin.png';
import TicketsIcon from '../assets/icons/tickets-icon.png';
import WinningsIcon from '../assets/icons/winnings.png';
import successIcon from '../assets/icons/success.png';
import scratchLogo from '../assets/icons/scratchLogo.png';
import priceIcon from '../assets/icons/priceIcon.png';
import flares from '../assets/icons/flares.png';
import Loader from './Loader';
import '../App.css';
import axios from 'axios';
import Confetti from 'react-confetti'
import winningSound from '../assets/sounds/winning-sound.mp3';
import loosingSound from '../assets/sounds/loosing-sound.mp3';

export default function ScratchCard({ bottomContainerStyle, menuContentStyle, buyButton, ticketBtn, ticketCount, dialogStyle, burgerMenu, winnerConditions, winningValues, currency, cardContainer, priceIcon, gameLogo, isFlares, rules, scratchedBg, bottomImage, scratchArea, apiEndpoint, tropheeObject, tropheeImage, token, scratchType }) {
    const [activeMenu, setActiveMenu] = useState(false);
    const [count, setCount] = useState(0);
    const [activeDialog, setActiveDialog] = useState('');
    const [loader, setLoader] = useState(false);
    const [returnMessage, setReturnMessage] = useState('');
    const [availableTickets, setAvailableTickets] = useState(0);
    const [targetScore, setTargetScore] = useState(0);
    const [ticketId, setTicketId] = useState(0);
    const [myArray, setMyArray] = useState([]);
    const [winningValue, setWinningValue] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [winningTickets, setWinningTickets] = useState([]);
    const [valuesArray, setValuesArray] = useState([]);
    const [isWinning, setIsWinning] = useState(false);


    const canvasRef = useRef(null);
    const scratchCardRef = useRef(null);
    const ctxRef = useRef(null);
    const overlayClearedRef = useRef(false);
    const isDrawingRef = useRef(false);
    const dialogRef = useRef(null);
    const playButtonRef = useRef(null);
    const replayButtonRef = useRef(null);
    const winningAudioRef = useRef(new Audio(winningSound));
    const loosingAudioRef = useRef(new Audio(loosingSound));

    const handleAdd = () => setCount(count + 1);
    const handleRemove = () => setCount(count > 0 ? count - 1 : 0);

    const toggleButtonVisibility = (buttonRef, shouldShow) => {
        if (buttonRef.current) {
            buttonRef.current.style.display = shouldShow ? 'block' : 'none';
        }
    };

    const openDialog = (dialogName) => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        setActiveDialog(dialogName);
        setTimeout(() => {
            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        }, 0);
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        setActiveDialog(null);
    };


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * pixelRatio;
        canvas.height = canvas.clientHeight * pixelRatio;

        const scratchImage = new Image();
        scratchImage.src = scratchArea;
        scratchImage.onload = () => {
            createTexture(ctx, scratchImage, canvas);
        };
    }, []);

    const createTexture = (ctx, scratchImage, canvas) => {
        canvas.width = scratchImage.width;
        canvas.height = scratchImage.height;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(scratchImage, 0, 0);
        ctx.globalCompositeOperation = "destination-out";
    };

    const handleMouseDown = () => {
        if (availableTickets > 0 && !overlayClearedRef.current) {
            isDrawingRef.current = true;
        }
    };

    const handleMouseUp = () => {
        if (availableTickets > 0 && !overlayClearedRef.current) {
            isDrawingRef.current = false;
            checkIfRevealed();
        }
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        const bounds = canvas.getBoundingClientRect();

        const scaleX = canvas.width / bounds.width;
        const scaleY = canvas.height / bounds.height;

        if (availableTickets > 0 && !overlayClearedRef.current && isDrawingRef.current) {
            const x = (e.clientX - bounds.left) * scaleX;
            const y = (e.clientY - bounds.top) * scaleY;
            clearOverlay(x, y);
            checkIfRevealed();
        }
    };

    const clearOverlay = (x, y) => {
        const ctx = ctxRef.current;
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    };

    const checkIfRevealed = () => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                transparentPixels++;
            }
        }

        const totalPixels = canvas.width * canvas.height;
        const revealPercentage = transparentPixels / totalPixels;

        if (revealPercentage >= 0.5) {
            clearCanvas();
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        overlayClearedRef.current = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        playTicket(ticketId);
        toggleButtonVisibility(playButtonRef, false);
        if (winningValue !== 'losing') {
            startScoreAnimation(targetScore);
        } else {
            startLoosingAnimation();
        }
    };

    useEffect(() => {
        fetchDataFromAPI();
        toggleButtonVisibility(playButtonRef, false);
        toggleButtonVisibility(replayButtonRef, false);
    }, [])

    function onBuyScratch() {
        setLoader(true);
        let url = `${apiEndpoint}scratch-api/tickets?isWallet=true&language=en`
        let body = {
            token: token,
            type: scratchType,
            numberOfTickets: count,
            gameType: scratchType,
        }
        axios.post(url, body)
            .then(response => {
                window.top.postMessage("called", "*");
                setLoader(false);
                setCount(0);
                if (response.data.status === 0) {
                    setReturnMessage(response.data.message)
                    openDialog('returnDialog');
                }
                else {
                    getUnplayed();
                }

                if (availableTickets === 0 && !overlayClearedRef.current) {
                    console.log("entered");
                    fetchDataFromAPI();
                }
            })
            .catch(error => {
                console.error("Fetch error: " + error.message);
            });
    }

    function getUnplayed() {
        setLoader(true);
        let pagesize = 1000;
        let pagenb = "0&isFinished=0";
        let url = `${apiEndpoint}scratch-api/tokens/${token}/tickets?Type=${scratchType}&PageNumber=${pagenb}&PageSize=${pagesize}`;

        axios.get(url)
            .then((response) => {
                setLoader(false);
                if (response.status === 200 && response.data.status === 1 && response.data.tickets !== null) {
                    setAvailableTickets(response.data.numberOfTickets);
                    if (response.data.numberOfTickets > 0 && overlayClearedRef.current) {
                        toggleButtonVisibility(replayButtonRef, true);
                    }
                } else {
                    console.error(response.data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function fetchDataFromAPI() {
        setLoader(true);
        if (token) {
            let pagesize = 1000;
            let pagenb = "0&isFinished=0";
            let url = `${apiEndpoint}scratch-api/tokens/${token}/tickets?Type=${scratchType}&PageNumber=${pagenb}&PageSize=${pagesize}`;

            axios.get(url)
                .then((response) => {
                    setLoader(false);
                    if (response.status === 200) {
                        const data = response.data;
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
                    } else {
                        console.error("Unexpected response status:", response.status);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });
        }
    }

    function getInfos() {
        setLoader(true);
        const pagesize = 1000;
        const pagenb = 0;
        const url = `${apiEndpoint}scratch-api/tokens/${token}/tickets?Type=${scratchType}&PageNumber=${pagenb}&PageSize=${pagesize}`;

        axios.get(url)
            .then((response) => {
                setLoader(false);
                const data = response.data;
                if (data.tickets) {
                    const filteredTickets = data.tickets.filter(item => item.ticketState !== "PENDING");
                    setTickets(filteredTickets);
                    openDialog('ticketsDialog');
                } else {
                    setReturnMessage(response.data.message)
                    openDialog('returnDialog');
                }
            })
            .catch((error) => {
                setLoader(false);
                console.error("Error:", error.message);
            });
    }

    function getWinningsInfos() {
        setLoader(true);
        const pagesize = 1000;
        const pagenb = 0;
        const url = `${apiEndpoint}scratch-api/tokens/${token}/tickets?Type=${scratchType}&isFinished=1&isWinning=true&PageNumber=${pagenb}&PageSize=${pagesize}`;

        axios.get(url)
            .then((response) => {
                setLoader(false);
                const data = response.data;
                if (data.tickets) {
                    const filteredTickets = data.tickets.filter(item => item.ticketState !== "PENDING");
                    setWinningTickets(filteredTickets);
                    openDialog('winningsDialog');
                } else {
                    setReturnMessage(response.data.message)
                    openDialog('returnDialog');
                }
            })
            .catch((error) => {
                setLoader(false);
                console.error("Error:", error.message);
            });
    }

    function playTicket(ticketId) {
        console.log("called");
        setLoader(true);
        let body = {
            token: token,
            gameType: scratchType,
            ticketId: ticketId
        }

        axios.patch(`${apiEndpoint}scratch-api/tickets?language=en`, body)
            .then((response) => {
                setLoader(false);
                window.top.postMessage("called", "*");
                getUnplayed(scratchType);
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    }

    function createValuesArray(values) {
        const valuesOnly = values.map((obj, index) => {
            if (obj.value === tropheeObject) {
                return {
                    type: 'image',
                    src: tropheeImage,
                };
            } else {
                return {
                    type: 'text',
                    value: obj.value,
                };
            }
        });

        setValuesArray(valuesOnly);
    }


    function playAgainFct() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
        const scratchImage = new Image();
        scratchImage.src = scratchArea;
        scratchImage.onload = () => {
            createTexture(ctx, scratchImage, canvas);
        };

        overlayClearedRef.current = false;
        fetchDataFromAPI();
        toggleButtonVisibility(replayButtonRef, false);
        // document
        //   .getElementById("playAgainButton")
        //   .classList.remove("blinking-button");
        // if (this.winningValue !== "losing") {
        //   stopWinningAnimation();
        // } else {
        //   stopLoosingAnimation();
        // }
    }

    function startScoreAnimation(score) {
        // const scoreAnimation = document.getElementById("scoreAnimation");
        // scoreAnimation.textContent = `${'Vous Gagnez' + "\n" + score}`;
        // scoreAnimation.classList.remove("hidden");
        winningAudioRef.current.play();
        setIsWinning(true);
    }


    function startLoosingAnimation() {
        loosingAudioRef.current.play();
    }

    //   function stopLoosingAnimation() {
    //     if (losingSound) {
    //       losingSound.pause();
    //       losingSound.currentTime = 0;
    //     }
    //   }

    //   function stopWinningAnimation() {
    //     const scoreAnimation = document.getElementById("scoreAnimation");
    //     scoreAnimation.classList.add("hidden");

    //     WinningSound.pause();
    //     WinningSound.currentTime = 0;

    //     confettiElements.forEach((confetti) => {
    //       confetti.remove();
    //     });
    //     confettiElements = [];
    //   }


    return (
        <Fragment>
            <div className="bottomContainer" style={bottomContainerStyle}>
                <div className="inside-content">
                    <div className="scratch-menu">
                        <div
                            className={`burger-menu ${activeMenu ? 'burger-active' : ''}`}
                            onClick={() => setActiveMenu(!activeMenu)}
                        >
                            <i className="item" style={burgerMenu}></i>
                            <i className="item" style={burgerMenu}></i>
                            <i className="item" style={burgerMenu}></i>
                        </div>
                        <ul className={`menu-content ${activeMenu ? 'burger-active' : ''}`} style={menuContentStyle}>
                            <li className="menu-item" onClick={() => openDialog('howToPlayDialog')}>
                                <img src={HowToPlayIcon} className="button-image" alt="menuIcon" />
                            </li>
                            <li className="menu-item tickets-item" onClick={getInfos}>
                                <img src={TicketsIcon} className="button-image" alt="menuIcon" />
                                <div className="custom-loader ticket-loader"></div>
                            </li>
                            <li className="menu-item tickets-item" onClick={getWinningsInfos}>
                                <img src={WinningsIcon} className="button-image" alt="menuIcon" />
                                <div className="ticket-loader"></div>
                            </li>
                            <li className="menu-item" onClick={() => openDialog('howToWinDialog')}>
                                <img src={HowToWinIcon} className="button-image" alt="menuIcon" />
                            </li>
                        </ul>
                    </div>
                    <div className="counter-tickets">
                        <button className="ticketBtn minusbtn" onClick={handleRemove} style={ticketBtn}>-</button>
                        <div className="ticket-container" style={ticketCount}>
                            <span className="countTickets">{count}</span>
                        </div>
                        <button className="ticketBtn plusbtn" onClick={handleAdd} style={ticketBtn}>+</button>
                        <button className="purchaseBtn" style={buyButton} onClick={onBuyScratch}>acheter</button>
                        <img src={successIcon} className="sucessIcon hidden" alt="menuIcon" />
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="small-areaContainer">
                <span className="tickets-text-mobile">Billets</span>
                <div className="ticket-inside">
                    <span id="availableTickets">{availableTickets}</span>
                </div>
            </div>

            <div className="cardContainer" id="card-container" style={{ backgroundImage: `url(${cardContainer})` }}>
                <div class="action-btns">
                    <button class="actionbtn actionbtn1" onClick={clearCanvas} ref={playButtonRef}>
                        grattez
                    </button>
                    <div class="actionbtn actionbtn2" id="playAgainButton" onClick={playAgainFct} ref={replayButtonRef}>
                        <span id="replay-label">rejouer</span>
                        {/* <div id="playAgain-custom-loader" class="custom-loader playAgain-loader"></div> */}
                    </div>
                </div>
                {isFlares && <img className='cardContainer__flares' alt='top flares' src={flares} />}
                <div className="cardContainer-content">
                    <div className='cardContainer-header'>
                        <img src={scratchLogo} className="scratch-logo" alt="scratch logo" />
                        <img src={priceIcon} className="price-icon" alt='price logo' />
                    </div>
                    <img src={gameLogo} className="game-logo" alt='game logo' />
                    {rules ? <p className="cardContainer__rules">{rules}</p> : ''}
                    <div className="scoringContainer">
                        <div id="scoreAnimation" className="scoreAnimation hidden">0</div>
                    </div>
                    <div className="confetti-container"></div>
                </div>
                <img src={bottomImage} className='cardContainer_bottomImg' alt='bottom img' />

                <div className="scratch-card" style={{ backgroundImage: `url(${scratchedBg})` }}>
                    <div className="main-flower"></div>
                    <div className="arrayContainer">
                        {valuesArray.map((item, index) => {
                            if (item.type === 'image') {
                                return <img key={index} src={item.src} alt="Trophy" className="value-item" />;
                            } else if (item.type === 'text') {
                                return <span key={index} className="value-item">{item.value}</span>;
                            }
                            return null;
                        })}
                    </div>
                    <canvas
                        ref={canvasRef}
                        className="scratch-area"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    ></canvas>
                </div>

            </div>
            {/*  */}
            <dialog ref={dialogRef} className='dialogWrapper' style={dialogStyle.dialogWrapper}>
                <button className="close-btn" onClick={closeDialog} style={dialogStyle.closeBtn}>x</button>

                {activeDialog === 'returnDialog' && (
                    <span className="winning-value">{returnMessage}</span>
                )}

                {activeDialog === 'ticketsDialog' && (
                    <div className="insideDialog">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date d'achat</th>
                                    <th>Achats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.purchaseDate}</td>
                                        <td>{ticket.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeDialog === 'winningsDialog' && (
                    <div className="insideDialog">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date d'achat</th>
                                    <th>Achats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {winningTickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.purchaseDate}</td>
                                        <td>{ticket.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeDialog === 'howToPlayDialog' && (
                    <div>
                        {winnerConditions && winnerConditions.map((value, index) => (
                            <div key={index} className="howToPlay-conditions" style={dialogStyle.winnerCondition}>
                                <div className="tag-container" style={dialogStyle.tagContainer}>
                                    <span className="tag-number" style={dialogStyle.tagNumber}>{index + 1}</span>
                                </div>
                                <span className="howToPlay-content" style={dialogStyle.winCondition}>{value.content}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeDialog === 'howToWinDialog' && (
                    <div className="howToWin-conditions">
                        {winningValues && winningValues.map((value, index) => (
                            <div key={index} className="winning-block">
                                <img src={value.image} alt='value icon' className='winning-img' />
                                <span className='winning-value'>{value.prize}{' ' + currency}</span>
                            </div>
                        ))}
                        {winningValues && winningValues.length > 0 ? '' :
                            <span className="winning-value">Trouvez 3 montant identiques et gagnez le montant associé</span>
                        }
                    </div>
                )}
            </dialog>


            {loader && <Loader />}
            {isWinning && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        </Fragment>
    );
}

ScratchCard.propTypes = {
    bottomContainerStyle: PropTypes.object,
    menuContentStyle: PropTypes.object,
    buyButton: PropTypes.object,
    ticketBtn: PropTypes.object,
    ticketCount: PropTypes.object,
    dialogStyle: PropTypes.object,
    burgerMenu: PropTypes.object,
    winnerConditions: PropTypes.object,
    winningValues: PropTypes.object,
    cardContainer: PropTypes.object,
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
    priceIcon: priceIcon,
    gameLogo: '',
    isFlares: false,
    rules: '',
    scratchedBg: '',
    bottomImage: '',
    apiEndpoint: '',
    tropheeObject: '',
    tropheeImage: '',
};
