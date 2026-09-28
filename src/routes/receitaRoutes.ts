import { Router } from 'express';
import { atualizar, buscarPorId, criar, excluir, listar } from '../controllers/receitaController';

const router = Router();

router.post('/', criar);
router.get('/', listar);
router.get('/:id', buscarPorId);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

export default router;
