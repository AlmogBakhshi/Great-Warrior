import { decorate, observable, action, configure } from 'mobx'
import * as Fetch from '../fetches/Fetch';
import * as Images from '../routes/Images';
configure({ enforceActions: 'observed' });

class GameStore {
    allFigures = [];
    playerFigures = [];
    allowAttack = true;
    attack = 0;
    totalLife = 0;
    life = 0;
    point = 0;
    gameStart = false;

    setAllFigures = (figures) => {
        this.allFigures = figures;

        let totalLife = 0;
        let totalAttack = 0;
        this.playerFigures.map(figure => {
            const theFigure = figures.find(res => res.Figure_Name === figure.Figure_Name);
            if (theFigure) {
                totalLife += theFigure.Figure_Defense;
                totalAttack += theFigure.Figure_Attack;
            }
        })
        this.attack = totalAttack;
        this.totalLife = totalLife;
        this.life = totalLife;
        this.gameStart = true;
    }

    setFigures = (figures) => {
        let figuresOfPlayerWitheImage = figures.map(item => ({ ...item, icon: Images[`${item.Figure_Name.replace(' ', '')}Icon`] }));
        if (figuresOfPlayerWitheImage.length < 4) {
            for (let index = figuresOfPlayerWitheImage.length; index < 4; index++) {
                figuresOfPlayerWitheImage = [...figuresOfPlayerWitheImage, 'none'];
            }
        }
        this.playerFigures = [...figuresOfPlayerWitheImage];

        // const lifeSum = figures.reduce((sum, figure) => sum + figure.)
    }

    setAllowAttack = () => {
        this.allowAttack = !this.allowAttack;
    }

    setLife = (attack) => {
        this.life = this.life - attack;
        this.point = this.attack;
    }

    fetchAllFigures = async () => {
        await Fetch.Get('figures')
            .then(res => res !== false && this.setAllFigures(res[0]))
            .catch(err => console.error(err));
    }

    fetchFiguresOfPlayer = async (email) => {
        await Fetch.Get(`figuresOfPlayer/${email}`)
            .then(res => res !== false && this.setFigures(res[0]))
            .then(() => this.fetchAllFigures())
            .catch(err => console.error(err));
    }

    fetchUpdatePlayerScore = async (email) => {
        const point = Math.ceil(this.point / 10);
        await Fetch.Put('game/addPoint', { email, point })
            .catch(err => console.error(err))
    }
}

decorate(GameStore, {
    allFigures: observable,
    playerFigures: observable,
    allowAttack: observable,
    attack: observable,
    totalLife: observable,
    life: observable,
    point: observable,
    gameStart: observable,
    setAllFigures: action,
    setFigures: action,
    setAllowAttack: action,
    setLife: action,
    fetchAllFigures: action,
    fetchFiguresOfPlayer: action,
    fetchUpdatePlayerScore: action
});

export default new GameStore()