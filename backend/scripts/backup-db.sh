#!/bin/bash
# Script de Backup Automático do PostgreSQL (MercadoPDV)
# Executar via Cronjob (ex: 0 2 * * * /caminho/backup-db.sh)

BACKUP_DIR="/var/backups/mercadopdv"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_CONTAINER="erp_pdv_db"
DB_USER="postgres"
DB_NAME="erp_pdv_db"

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Iniciando backup do banco de dados..."

docker exec -t $DB_CONTAINER pg_dump -U $DB_USER -d $DB_NAME -F c -f /tmp/backup_$DATE.dump
docker cp $DB_CONTAINER:/tmp/backup_$DATE.dump $BACKUP_DIR/backup_$DATE.dump
docker exec -t $DB_CONTAINER rm /tmp/backup_$DATE.dump

# Retém apenas os últimos 7 dias
find $BACKUP_DIR -type f -name "*.dump" -mtime +7 -exec rm {} \;

echo "[$(date)] Backup concluído com sucesso: $BACKUP_DIR/backup_$DATE.dump"
