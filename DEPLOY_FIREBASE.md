# Deploy no Firebase - Guia Completo

## 📋 Pré-requisitos

1. Ter o Firebase CLI instalado globalmente:
   ```bash
   npm install -g firebase-tools
   ```

2. Ter uma conta Google com acesso ao projeto Firebase

## 🚀 Passos para Deploy

### 1. Fazer Login no Firebase

```bash
firebase login
```

Isso abrirá uma janela no navegador para você fazer login com sua conta Google.

### 2. Verificar o Projeto

O projeto já está configurado no arquivo `.firebaserc`:
- **Projeto ID**: `advogados-150b3`

### 3. Fazer Build do Projeto

```bash
npm run build
```

Isso criará a pasta `dist/` com os arquivos otimizados para produção.

### 4. Fazer Deploy

```bash
firebase deploy
```

Ou apenas para o hosting:

```bash
firebase deploy --only hosting
```

## 🌐 URL do Site

Após o deploy, você receberá uma URL como:
- `https://advogados-150b3.web.app`
- `https://advogados-150b3.firebaseapp.com`

## 🔧 Configuração do Backend (Firestore)

Para hospedar o backend dos contatos no Firebase Firestore:

### 1. Criar Firestore Database

1. Acesse o [Console do Firebase](https://console.firebase.google.com/u/0/project/advogados-150b3/overview)
2. Vá em **Firestore Database**
3. Clique em **Criar banco de dados**
4. Escolha modo de produção ou teste
5. Escolha a localização (ex: `southamerica-east1` para São Paulo)

### 2. Configurar Regras de Segurança

No Firestore, vá em **Regras** e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contatos - apenas leitura para admin autenticado
    match /contatos/{contatoId} {
      allow read: if request.auth != null;
      allow write: if false; // Apenas leitura, escrita via código
    }
    
    // Configurações do advogado
    match /configuracao/{document=**} {
      allow read: if true; // Público
      allow write: if request.auth != null; // Apenas admin
    }
  }
}
```

### 3. Integrar Firestore no Código

Para usar o Firestore ao invés do localStorage:

1. **Instalar Firebase SDK** (já instalado):
   ```bash
   npm install firebase
   ```

2. **Criar arquivo de configuração** (`src/config/firebase.ts`):

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "advogados-150b3.firebaseapp.com",
  projectId: "advogados-150b3",
  storageBucket: "advogados-150b3.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

3. **Obter as credenciais**:
   - Acesse o Console do Firebase
   - Vá em **Configurações do Projeto** (ícone de engrenagem)
   - Role até **Seus apps**
   - Clique em **Web** (</>)
   - Copie o objeto `firebaseConfig`

### 4. Migrar localStorage para Firestore

Substitua as chamadas de `localStorage` por chamadas ao Firestore:

**Exemplo para salvar contato:**
```typescript
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Salvar contato
const salvarContato = async (contato: ClienteFormulario) => {
  try {
    await addDoc(collection(db, 'contatos'), {
      ...contato,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Erro ao salvar contato:', error);
  }
};
```

**Exemplo para ler contatos:**
```typescript
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const lerContatos = async () => {
  try {
    const q = query(collection(db, 'contatos'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao ler contatos:', error);
  }
};
```

## 🔐 Autenticação Firebase

Para autenticação mais robusta:

1. **Habilitar Authentication** no Console do Firebase
2. **Escolher método de login** (Email/Senha, Google, etc.)
3. **Integrar no código** usando `signInWithEmailAndPassword` ou `signInWithPopup`

## 📊 Monitoramento

- **Performance**: Monitore o desempenho do site
- **Analytics**: Adicione Firebase Analytics para métricas
- **Crashlytics**: Para rastrear erros

## 🔄 Atualizações Futuras

Para fazer deploy de atualizações:

```bash
npm run build
firebase deploy
```

## 📝 Arquivos Importantes

- `.firebaserc` - Configuração do projeto
- `firebase.json` - Configuração do hosting
- `dist/` - Arquivos de produção (gerados pelo build)

## ⚠️ Notas Importantes

1. O Firebase Hosting é gratuito até 10GB de armazenamento e 360MB/dia de transferência
2. O Firestore tem um tier gratuito generoso
3. Sempre faça backup dos dados importantes
4. Configure regras de segurança adequadas

