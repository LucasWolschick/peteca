import { Request, Response, Router } from 'express';
import ItemService from '../service/ItemService';
import { ServiceManager } from '../service/ServiceManager';
import { checkAuthenticated } from './UserController';

const itemService = new ItemService();
const permissionsService = ServiceManager.getPermissionsService();

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const user = checkAuthenticated(req);
        const permissions = await permissionsService.getUserPermissions(user.id);
        if (!permissions.includes('Gerir Estoque')) {
            res.status(403).json({ message: 'Você não tem permissão para acessar este recurso.'});
            return;
        }
        const items = await ItemService.getItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.put('/update-multiple', async (req: Request, res: Response) => {
    try {
        const user = checkAuthenticated(req);
        const permissions = await permissionsService.getUserPermissions(user.id);
        if (!permissions.includes('Gerir Estoque')) {
            res.status(403).json({ message: 'Você não tem permissão para acessar este recurso.'});
            return;
        }
        const itemsToUpdate = req.body;
        await itemService.updateItems(itemsToUpdate);
        res.status(200).json({ message: 'Itens atualizados com sucesso!'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get items pelo id 
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = checkAuthenticated(req);
        const permissions = await permissionsService.getUserPermissions(user.id);
        if (!permissions.includes('Gerir Estoque')) {
            res.status(403).json({ message: 'Você não tem permissão para acessar este recurso.'});
            return;
        }
        const id = parseInt(req.params.id);
        const item = await itemService.getItemById(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// Delete item pelo id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const user = checkAuthenticated(req);
        const permissions = await permissionsService.getUserPermissions(user.id);
        if (!permissions.includes('Gerir Estoque')) {
            res.status(403).json({ message: 'Você não tem permissão para acessar este recurso.'});
            return;
        }
        const id = parseInt(req.params.id);
        await itemService.deleteItem(id);
        res.status(200).json({ message: 'Item deletado com sucesso!'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/search', async (req: Request, res: Response) => {
    try {
        const user = checkAuthenticated(req);
        const permissions = await permissionsService.getUserPermissions(user.id);
        if (!permissions.includes('Gerir Estoque')) {
            res.status(403).json({ message: 'Você não tem permissão para acessar este recurso.'});
            return;
        }
        const searchParams = req.query;
        const items = await itemService.searchItems(searchParams);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/create', async(req: Request, res: Response) => {
    try {
        const user = checkAuthenticated(req);
        const permissions = await permissionsService.getUserPermissions(user.id);
        if (!permissions.includes('Gerir Estoque')) {
            res.status(403).json({ message: 'Você não tem permissão para acessar este recurso.'});
            return;
        }
        const { nome, quantidade, unidadeMedida, local } = req.body;
        const newItem = await itemService.createItem(nome, quantidade, unidadeMedida, local);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;

