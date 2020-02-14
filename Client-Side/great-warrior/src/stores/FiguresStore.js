import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' });
import * as Fetch from '../fetches/Fetch';
import * as Images from '../routes/Images';

class FiguresStore {
    figures = [];
    figuresOfPlayer = [];

    setFigures = (value) => {
        const figuresWitheImage = value.map(item => ({ ...item, icon: Images[`${item.Figure_Name.replace(' ', '')}Icon`] }));
        this.figures = figuresWitheImage;
    }

    setFiguresOfPlayer = (value) => {
        let figuresOfPlayerWitheImage = value !== 'n' ? value.map(item => ({ ...item, icon: Images[`${item.Figure_Name.replace(' ', '')}Icon`] })) : [];
        if (figuresOfPlayerWitheImage.length < 4) {
            for (let index = figuresOfPlayerWitheImage.length; index < 4; index++) {
                figuresOfPlayerWitheImage = [...figuresOfPlayerWitheImage, 'none'];
            }
        }
        this.figuresOfPlayer = [...figuresOfPlayerWitheImage];
    }

    fetchAllFigures = async () => {
        await Fetch.Get('figures')
            .then(res => res !== false && this.setFigures(res[0]))
            .catch(err => console.error(err));
    }

    fetchFiguresOfPlayer = async (email) => {
        //this.setFiguresOfPlayer(res[0])
        await Fetch.Get(`figuresOfPlayer/${email}`)
            .then(res => res !== false && this.setFiguresOfPlayer(res[0]))
            .catch(err => console.error(err));
    }

    fetchAddToFigureOfPlayer = async (body) => {
        return await Fetch.Post('figuresOfPlayer/addFigure', body)
            .catch(err => console.error(err))
    }

    fetchDeleteFromFigureOfPlayer = async (body) => {
        return await Fetch.Delete('figuresOfPlayer/deleteFigure', body)
            .catch(err => console.error(err))
    }
}

decorate(FiguresStore, {
    figures: observable,
    figuresOfPlayer: observable,
    setFigures: action,
    setFiguresOfPlayer: action,
    fetchAllFigures: action,
    fetchFiguresOfPlayer: action,
    fetchAddToFigureOfPlayer: action,
    fetchDeleteFromFigureOfPlayer: action,
});

export default new FiguresStore()