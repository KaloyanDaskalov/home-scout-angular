import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Advertisement } from './shared/interfaces/advertisement';

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

  getByChild (child: string, type: string): AngularFireList<Advertisement> {
    return this.db.list(this.dbPath, ref => ref.orderByChild(child).equalTo(type));
  }

  getOne (id: string): AngularFireObject<Advertisement> {
    return this.db.object(`${this.dbPath}/${id}`);
  }

  create(advertisement: Advertisement): any {
    return this.advertisementRef.push(advertisement);
  }

  update(id: string, value: Advertisement): Promise<void> {
    return this.advertisementRef.update(id, value);
  }

  delete(id: string ): Promise<void> {
    return this.advertisementRef.remove(id);
  }

  deleteAll(): Promise<void> {
    return this.advertisementRef.remove();
  }
}
