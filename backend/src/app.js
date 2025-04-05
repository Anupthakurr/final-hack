dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173', // Your Vite dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',userRoutes)
app.use(errorHandler);
app.use(notFound)

export default app

