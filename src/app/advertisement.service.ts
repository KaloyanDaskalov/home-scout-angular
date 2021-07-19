import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Advertisement } from './interfaces/advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private dbPath = '/advertisements';

  advertisementRef: AngularFireList<Advertisement>;

  constructor(private db: AngularFireDatabase) {
    this.advertisementRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Advertisement> {
    return this.advertisementRef;
  }

  create(advertisement: Advertisement): any {
    return this.advertisementRef.push(advertisement);
  }

  update(key: string, value: any): Promise<void> {
    return this.advertisementRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.advertisementRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.advertisementRef.remove();
  }
}
