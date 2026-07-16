import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private prisma: PrismaService) {}

  async predictStockDepletion(companyId: string) {
    this.logger.log(`[AI] Rodando predição de ruptura de estoque para a empresa ${companyId}`);
    
    // Na vida real, a IA varreria a tabela 'SaleItem' nos últimos 30 dias para extrair o Turnover rate diário.
    // Como estamos no MVP local, vamos simular a lógica algorítmica:
    
    const products = await this.prisma.product.findMany({
      where: { companyId },
      select: { id: true, name: true, stockQty: true }
    });

    const predictions = products.map(p => {
      // Fake turnover rate entre 1 e 10 itens vendidos por dia
      const estimatedDailySales = Math.floor(Math.random() * 10) + 1;
      
      const daysUntilEmpty = p.stockQty > 0 ? Math.floor(p.stockQty / estimatedDailySales) : 0;
      
      let riskLevel = 'LOW';
      if (daysUntilEmpty <= 3) riskLevel = 'CRITICAL';
      else if (daysUntilEmpty <= 7) riskLevel = 'WARNING';

      return {
        productId: p.id,
        productName: p.name,
        currentStock: p.stockQty,
        estimatedDailySales,
        daysUntilEmpty,
        riskLevel
      };
    });

    // Ordenar pelo maior risco
    return predictions.sort((a, b) => a.daysUntilEmpty - b.daysUntilEmpty).slice(0, 5); // Top 5 críticos
  }
}
