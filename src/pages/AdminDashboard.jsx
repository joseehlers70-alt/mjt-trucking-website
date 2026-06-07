import {
  Check,
  Eye,
  EyeOff,
  ImagePlus,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createSlug,
  deleteTruck,
  formatPrice,
  getAdminTrucks,
  saveTruck,
  uploadTruckImages,
} from '../lib/inventory.js';
import { isSupabaseConfigured, supabase } from '../lib/supabase.js';

const emptyTruck = {
  id: '',
  stock_code: '',
  slug: '',
  title: '',
  make: '',
  model: '',
  variant: '',
  category: 'Truck Tractor',
  year: new Date().getFullYear(),
  mileage_km: '',
  price: '',
  price_is_poa: false,
  condition: 'Used',
  transmission: '',
  fuel_type: 'Diesel',
  axle_config: '',
  engine: '',
  horsepower: '',
  gvm_kg: '',
  tare_kg: '',
  colour: '',
  location_city: 'Boksburg',
  location_province: 'Gauteng',
  description: '',
  features: [],
  image_urls: [],
  main_image_url: '',
  status: 'available',
  is_published: false,
};

const numericFields = ['year', 'mileage_km', 'price', 'horsepower', 'gvm_kg', 'tare_kg'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sessionReady, setSessionReady] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadTrucks = async () => {
    setLoading(true);
    setError('');
    try {
      setTrucks(await getAdminTrucks());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Connect Supabase environment variables to activate inventory management.');
      setSessionReady(true);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate('/admin/login', { replace: true });
        return;
      }
      setSessionReady(true);
      loadTrucks();
    });
  }, [navigate]);

  const visibleTrucks = useMemo(() => {
    const term = search.toLowerCase();
    return trucks.filter((truck) =>
      [truck.title, truck.stock_code, truck.make, truck.model].filter(Boolean).join(' ').toLowerCase().includes(term),
    );
  }, [search, trucks]);

  const signOut = async () => {
    await supabase?.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const removeTruck = async (truck) => {
    if (!window.confirm(`Delete ${truck.title}? This cannot be undone.`)) return;
    try {
      await deleteTruck(truck.id);
      await loadTrucks();
      setNotice('Listing deleted.');
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const togglePublished = async (truck) => {
    try {
      await saveTruck({ ...truck, is_published: !truck.is_published });
      await loadTrucks();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  if (!sessionReady) return <div className="admin-loading">Checking access...</div>;

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <img src="/images/mjt-trucking-logo-transparent-hd.png" alt="MJT Trucking" />
        <div>
          <span>Inventory management</span>
          <button type="button" onClick={signOut}><LogOut size={17} /> Sign out</button>
        </div>
      </header>

      <div className="admin-workspace">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-heading">
            <div><span>Vehicle listings</span><strong>{trucks.length}</strong></div>
            <button type="button" className="admin-icon-button" onClick={() => setEditing({ ...emptyTruck })} title="Add vehicle">
              <Plus size={20} />
            </button>
          </div>
          <input className="admin-search" aria-label="Search stock" value={search} onChange={(event) => setSearch(event.target.value)} />
          {loading && <p className="admin-muted">Loading inventory...</p>}
          {visibleTrucks.map((truck) => (
            <article className="admin-listing-row" key={truck.id}>
              <div className="admin-listing-thumb">
                {truck.main_image_url ? <img src={truck.main_image_url} alt="" /> : <span>{truck.make?.slice(0, 1)}</span>}
              </div>
              <button className="admin-listing-copy" type="button" onClick={() => setEditing({ ...truck })}>
                <strong>{truck.title}</strong>
                <span>{truck.stock_code} · {formatPrice(truck)}</span>
              </button>
              <div className="admin-row-actions">
                <button type="button" onClick={() => togglePublished(truck)} title={truck.is_published ? 'Unpublish' : 'Publish'}>
                  {truck.is_published ? <Eye size={17} /> : <EyeOff size={17} />}
                </button>
                <button type="button" onClick={() => setEditing({ ...truck })} title="Edit"><Pencil size={17} /></button>
                <button type="button" onClick={() => removeTruck(truck)} title="Delete"><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
          {!loading && trucks.length === 0 && <p className="admin-muted">No inventory records yet.</p>}
        </aside>

        <section className="admin-main">
          {notice && <div className="admin-notice"><Check size={17} /> {notice}</div>}
          {error && <div className="form-error">{error}</div>}
          {editing ? (
            <TruckEditor
              truck={editing}
              saving={saving}
              onCancel={() => setEditing(null)}
              onSaved={async () => {
                setSaving(false);
                setEditing(null);
                setNotice('Listing saved successfully.');
                await loadTrucks();
              }}
              onSaving={setSaving}
              onError={(message) => {
                setSaving(false);
                setError(message);
              }}
            />
          ) : (
            <div className="admin-empty">
              <ImagePlus size={42} />
              <h1>Manage MJT inventory</h1>
              <p>Select a vehicle to edit it, or add a new truck or trailer.</p>
              <button className="button button-primary" type="button" onClick={() => setEditing({ ...emptyTruck })}>
                <Plus size={18} /> Add vehicle
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function TruckEditor({ truck, saving, onCancel, onSaved, onSaving, onError }) {
  const [values, setValues] = useState({
    ...emptyTruck,
    ...truck,
    featuresText: (truck.features || []).join('\n'),
  });
  const [newFiles, setNewFiles] = useState([]);

  const updateValue = (event) => {
    const { name, type, checked, value } = event.target;
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const removeImage = (url) => {
    setValues((current) => ({
      ...current,
      image_urls: current.image_urls.filter((image) => image !== url),
      main_image_url: current.main_image_url === url ? '' : current.main_image_url,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    onSaving(true);
    try {
      const uploaded = newFiles.length ? await uploadTruckImages(newFiles, values.stock_code) : [];
      const imageUrls = [...values.image_urls, ...uploaded];
      const prepared = {
        ...values,
        slug: values.slug || createSlug(values),
        title: values.title || `${values.year} ${values.make} ${values.model}`.trim(),
        features: values.featuresText.split('\n').map((item) => item.trim()).filter(Boolean),
        image_urls: imageUrls,
        main_image_url: values.main_image_url || imageUrls[0] || null,
      };
      delete prepared.featuresText;
      numericFields.forEach((field) => {
        prepared[field] = prepared[field] === '' ? null : Number(prepared[field]);
      });
      if (!prepared.id) delete prepared.id;
      await saveTruck(prepared);
      await onSaved();
    } catch (requestError) {
      onError(requestError.message);
    }
  };

  return (
    <form className="truck-editor" onSubmit={submit}>
      <div className="editor-toolbar">
        <div>
          <span>{values.id ? 'Edit listing' : 'New listing'}</span>
          <h1>{values.title || 'Add truck or trailer'}</h1>
        </div>
        <div>
          <button className="button admin-cancel" type="button" onClick={onCancel}><X size={18} /> Cancel</button>
          <button className="button button-primary" type="submit" disabled={saving}><Save size={18} /> {saving ? 'Saving...' : 'Save listing'}</button>
        </div>
      </div>

      <div className="editor-section">
        <h2>Listing identity</h2>
        <div className="editor-grid editor-grid-three">
          <EditorField label="Stock code" name="stock_code" value={values.stock_code} onChange={updateValue} required />
          <EditorField label="Make" name="make" value={values.make} onChange={updateValue} required />
          <EditorField label="Model" name="model" value={values.model} onChange={updateValue} required />
          <EditorField label="Listing title" name="title" value={values.title} onChange={updateValue} />
          <EditorField label="Variant / description" name="variant" value={values.variant} onChange={updateValue} />
          <EditorField label="URL slug" name="slug" value={values.slug} onChange={updateValue} />
          <EditorSelect label="Category" name="category" value={values.category} onChange={updateValue} options={['Truck Tractor', 'Rigid Truck', 'Dropside', 'Tipper', 'Van Body Truck', 'Trailer', 'Other']} />
          <EditorField label="Year" name="year" type="number" value={values.year} onChange={updateValue} required />
          <EditorField label="Mileage (km)" name="mileage_km" type="number" value={values.mileage_km} onChange={updateValue} />
        </div>
      </div>

      <div className="editor-section">
        <h2>Price and availability</h2>
        <div className="editor-grid editor-grid-three">
          <EditorField label="Price (ZAR)" name="price" type="number" value={values.price} onChange={updateValue} disabled={values.price_is_poa} />
          <EditorSelect label="Status" name="status" value={values.status} onChange={updateValue} options={['available', 'reserved', 'sold']} />
          <EditorField label="Condition" name="condition" value={values.condition} onChange={updateValue} />
        </div>
        <div className="editor-toggles">
          <label><input type="checkbox" name="price_is_poa" checked={values.price_is_poa} onChange={updateValue} /> Price on application</label>
          <label><input type="checkbox" name="is_published" checked={values.is_published} onChange={updateValue} /> Published on website</label>
        </div>
      </div>

      <div className="editor-section">
        <h2>Vehicle specifications</h2>
        <div className="editor-grid editor-grid-three">
          <EditorField label="Transmission" name="transmission" value={values.transmission} onChange={updateValue} />
          <EditorField label="Fuel type" name="fuel_type" value={values.fuel_type} onChange={updateValue} />
          <EditorField label="Axle configuration" name="axle_config" value={values.axle_config} onChange={updateValue} />
          <EditorField label="Engine" name="engine" value={values.engine} onChange={updateValue} />
          <EditorField label="Horsepower" name="horsepower" type="number" value={values.horsepower} onChange={updateValue} />
          <EditorField label="Colour" name="colour" value={values.colour} onChange={updateValue} />
          <EditorField label="GVM (kg)" name="gvm_kg" type="number" value={values.gvm_kg} onChange={updateValue} />
          <EditorField label="Tare (kg)" name="tare_kg" type="number" value={values.tare_kg} onChange={updateValue} />
          <EditorField label="City" name="location_city" value={values.location_city} onChange={updateValue} />
          <EditorField label="Province" name="location_province" value={values.location_province} onChange={updateValue} />
        </div>
      </div>

      <div className="editor-section">
        <h2>Description and features</h2>
        <div className="editor-grid">
          <label><span>Description</span><textarea name="description" rows="7" value={values.description} onChange={updateValue} /></label>
          <label><span>Features, one per line</span><textarea name="featuresText" rows="7" value={values.featuresText} onChange={updateValue} /></label>
        </div>
      </div>

      <div className="editor-section">
        <h2>Vehicle photos</h2>
        <label className="image-upload">
          <ImagePlus size={22} />
          <span>Upload multiple photos</span>
          <input type="file" accept="image/*" multiple onChange={(event) => setNewFiles([...event.target.files])} />
        </label>
        {newFiles.length > 0 && <p className="admin-muted">{newFiles.length} photo(s) ready to upload when saved.</p>}
        <div className="admin-image-grid">
          {values.image_urls.map((url) => (
            <div className={values.main_image_url === url ? 'admin-image active' : 'admin-image'} key={url}>
              <img src={url} alt="" />
              <button type="button" onClick={() => setValues((current) => ({ ...current, main_image_url: url }))}>
                {values.main_image_url === url ? <Check size={16} /> : 'Set main'}
              </button>
              <button className="remove" type="button" onClick={() => removeImage(url)} title="Remove photo"><X size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

function EditorField({ label, ...inputProps }) {
  return <label><span>{label}</span><input {...inputProps} /></label>;
}

function EditorSelect({ label, options, ...selectProps }) {
  return (
    <label>
      <span>{label}</span>
      <select {...selectProps}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>
    </label>
  );
}
