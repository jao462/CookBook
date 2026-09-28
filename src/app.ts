import express from 'express';
import cors from 'cors';
import categoriaRoutes from './routes/categoriaRoutes';
import receitaRoutes from './routes/receitaRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API CookBook funcionando!',
    versao: '1.0.0'
  });
});

app.use('/categorias', categoriaRoutes);
app.use('/receitas', receitaRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

export default app;
