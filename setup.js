const fs = require('fs');
const path = require('path');

// Proje yapısı ve dosyaları
const structure = {
  frontend: {
    'package.json': '', 
    public: {
      'index.html': ''
    },
    src: {
      'index.js': '',
      'App.js': '',
      api: {
        'authApi.js': '',
        'eventApi.js': '',
        'roommateApi.js': '',
        'itemApi.js': '',
        'messageApi.js': '',
        'notificationApi.js': ''
      },
      components: {
        'Navbar.js': '',
        'EventCard.js': '',
        'RoommateCard.js': '',
        'ItemCard.js': '',
        'MessageBox.js': '',
        'NotificationBell.js': ''
      },
      pages: {
        'Home.js': '',
        'EventPage.js': '',
        'RoommatePage.js': '',
        'ItemPage.js': '',
        'ForumPage.js': '',
        'ProfilePage.js': '',
        'AuthPage.js': ''
      },
      context: {
        'AuthContext.js': '',
        'MessageContext.js': '',
        'NotificationContext.js': ''
      },
      styles: {
        'globals.css': ''
      }
    }
  },
  backend: {
    'package.json': '',
    'server.js': '',
    config: {
      'db.js': ''
    },
    routes: {
      'authRoutes.js': '',
      'eventRoutes.js': '',
      'roommateRoutes.js': '',
      'itemRoutes.js': '',
      'messageRoutes.js': '',
      'notificationRoutes.js': ''
    },
    controllers: {
      'authController.js': '',
      'eventController.js': '',
      'roommateController.js': '',
      'itemController.js': '',
      'messageController.js': '',
      'notificationController.js': ''
    },
    models: {
      'User.js': '',
      'Event.js': '',
      'RoommateListing.js': '',
      'Item.js': '',
      'Message.js': '',
      'Notification.js': ''
    },
    middlewares: {
      'authMiddleware.js': ''
    },
    utils: {
      'emailSender.js': ''
    }
  },
  database: {
    'schema.sql': '',
    'seed.sql': ''
  },
  '.env': '',
  'README.md': ''
};

// Fonksiyon: klasör ve dosya oluşturma
function createStructure(basePath, obj) {
  for (let key in obj) {
    const itemPath = path.join(basePath, key);
    if (typeof obj[key] === 'object') {
      if (!fs.existsSync(itemPath)) fs.mkdirSync(itemPath);
      createStructure(itemPath, obj[key]);
    } else {
      fs.writeFileSync(itemPath, obj[key]);
    }
  }
}

// Çalıştır
createStructure(__dirname, structure);
console.log('Proje klasörleri ve temel dosyalar oluşturuldu!');
