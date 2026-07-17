import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SalesModule } from './modules/sales/sales.module';
import { EventsModule } from './events/events.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { UsersModule } from './modules/users/users.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { CashModule } from './modules/cash/cash.module';
import { FiscalModule } from './modules/fiscal/fiscal.module';
import { AiModule } from './modules/ai/ai.module';
import { FinancialModule } from './modules/financial/financial.module';
import { StockModule } from './modules/stock/stock.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    CompaniesModule,
    ProductsModule,
    CustomersModule,
    SalesModule,
    EventsModule,
    SuppliersModule,
    PurchasesModule,
    UsersModule,
    IntegrationsModule,
    CashModule,
    FiscalModule,
    AiModule,
    AuthModule,
    FinancialModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes(
        'api/companies',
        'api/products',
        'api/customers',
        'api/sales',
        'api/purchases',
        'api/suppliers',
        'api/users',
        'api/cash',
        'api/fiscal'
      );
  }
}
