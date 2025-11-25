/**
 * Database Migration Script
 * Creates all tables and indexes
 */

import { getDb } from './connection.js';
import { schema, indexes } from './schema.js';

const db = getDb();

console.log('🚀 Starting database migration...\n');

try {
  // Create all tables
  console.log('📦 Creating tables...');
  Object.entries(schema).forEach(([tableName, createStatement]) => {
    console.log(`  ├─ Creating table: ${tableName}`);
    db.exec(createStatement);
  });
  console.log('  └─ ✅ All tables created successfully\n');

  // Create all indexes
  console.log('🔍 Creating indexes...');
  indexes.forEach((indexStatement, i) => {
    console.log(`  ├─ Creating index ${i + 1}/${indexes.length}`);
    db.exec(indexStatement);
  });
  console.log('  └─ ✅ All indexes created successfully\n');

  // Insert default settings
  console.log('⚙️  Inserting default settings...');
  const defaultSettings = [
    ['app_name', 'Talent Bridge', 'Application name'],
    ['default_currency', 'USD', 'Default currency for revenue'],
    ['auto_post_enabled', 'false', 'Enable automatic posting to social media'],
    ['daily_post_limit', '20', 'Maximum posts per day across all platforms'],
    ['default_referral_code', '', 'Default Mercor referral code'],
    ['analytics_enabled', 'true', 'Enable analytics tracking'],
    ['notification_email', 'turhanhamza@gmail.com', 'Email for notifications'],
    ['timezone', 'Europe/Istanbul', 'Default timezone'],
    ['last_sync_date', new Date().toISOString(), 'Last data synchronization date']
  ];

  const insertSetting = db.prepare(`
    INSERT OR IGNORE INTO settings (key, value, description)
    VALUES (?, ?, ?)
  `);

  defaultSettings.forEach(([key, value, description]) => {
    insertSetting.run(key, value, description);
    console.log(`  ├─ Setting: ${key} = ${value}`);
  });
  console.log('  └─ ✅ Default settings inserted\n');

  console.log('✨ Migration completed successfully!');
  console.log('📊 Database is ready to use.\n');

} catch (error) {
  console.error('❌ Migration failed:', error.message);
  process.exit(1);
}

process.exit(0);
