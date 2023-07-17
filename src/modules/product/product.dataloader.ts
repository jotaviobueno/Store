import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { StockSchema } from '../../domain/schemas';
import { StockService } from '../stock/stock.service';

@Injectable({ scope: Scope.REQUEST })
export class ProductLoader {
  private readonly dataLoader: DataLoader<string, StockSchema[]>;
  name = 'ProductLoader';

  constructor(private readonly stockService: StockService) {
    this.dataLoader = new DataLoader<string, StockSchema[]>(
      (keys) => this.batchProduct([...keys]),
      {
        cache: true,
      },
    );
  }

  private async batchProduct(productsId: string[]): Promise<StockSchema[][]> {
    const stocks = await this.stockService.findManyByProductId(productsId);

    const stocksMap: Record<string, StockSchema[]> = {};

    stocks.forEach((stock) => {
      if (!stocksMap[stock.productId]) stocksMap[stock.productId] = [];

      stocksMap[stock.productId].push(stock);
    });

    return productsId.map((id) => stocksMap[id]);
  }

  load(key: string): Promise<StockSchema[]> {
    return this.dataLoader.load(key);
  }
}
