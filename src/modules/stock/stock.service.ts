import { Injectable } from '@nestjs/common';
import { CreateStockInput } from '../../domain/dtos';
import { StockRepository } from './stock.repository';
import { StockSchema } from '../../domain/schemas';
import { STOCK_ENUM } from '../../domain/enums';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  create(createStockInput: CreateStockInput) {
    return this.stockRepository.create(createStockInput);
  }

  findAll(productId: string) {
    return this.stockRepository.findAll(productId);
  }

  findAllTypeInput(productId: string) {
    return this.stockRepository.findAllTypeInput(productId);
  }

  async getTotalStock(productId: string): Promise<number> {
    const stocks = await this.findAllTypeInput(productId);

    return stocks.reduce(
      (accumulator, currentValue) => accumulator + currentValue.stock,
      0,
    );
  }

  async getManyTotalStock(productsIds: string[]): Promise<number> {
    const stocks = await this.stockRepository.findManyTypeInput(productsIds);

    return stocks.reduce(
      (accumulator, currentValue) => accumulator + currentValue.stock,
      0,
    );
  }

  async remove(productId: string, newStock: number) {
    const stocks = await this.findAllTypeInput(productId);

    const stocksMock = JSON.parse(JSON.stringify(stocks));

    const totalStock = stocks.reduce(
      (accumulator, currentValue) => accumulator + currentValue.stock,
      0,
    );

    const stockMock = totalStock - newStock;

    newStock = stockMock;

    for (const stockObj of stocks) {
      if (newStock >= stockObj.stock) {
        newStock -= stockObj.stock;
        stockObj.stock = 0;
      } else {
        stockObj.stock -= newStock;
        newStock = 0;
        break;
      }
    }

    const onlyStocksModified: StockSchema[] = stocksMock
      .map((stockMock: StockSchema, index: number) => {
        if (JSON.stringify(stockMock) !== JSON.stringify(stocks[index])) {
          return stocks[index];
        }
      })
      .filter(Boolean);

    for (const onlyStockModified of onlyStocksModified) {
      await this.stockRepository.update(
        onlyStockModified.id,
        onlyStockModified.stock,
      );
    }

    await this.stockRepository.create({
      stock: -stockMock,
      type: STOCK_ENUM.OUTPUT,
      productId,
    });
  }
}
