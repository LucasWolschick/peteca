import { Request, Response, Router } from 'express';
import ItemService from '../service/ItemService';

const itemService = new ItemService();

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const items = await ItemService.getItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.put('/update-multiple', async (req: Request, res: Response) => {
    try {
        const itemsToUpdate = req.body;
        await itemService.updateItems(itemsToUpdate);
        res.status(200).json({ message: 'Itens atualizados com sucesso!'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;