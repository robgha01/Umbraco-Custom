import { css, customElement, html, property } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbPropertyValueChangeEvent } from '@umbraco-cms/backoffice/property-editor';
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/extension-registry';
import '@umbraco-cms/backoffice/tags';

interface KeyValueTagItem {
    key: string;
    tags: Array<string>;
}

@customElement('key-value-tags-editor')
export class KeyValueTagsEditorElement extends UmbLitElement implements UmbPropertyEditorUiElement {
    @property({ type: Array })
    public value?: Array<KeyValueTagItem>;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property()
    public config?: any;

    constructor() {
        super();
        this.value = [];
    }

    #onAdd() {
        this.value = [...(this.value ?? []), { key: '', tags: [] }];
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    #onRemove(index: number) {
        this.value = (this.value ?? []).filter((_, i) => i !== index);
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    #onKeyChange(index: number, event: Event) {
        const input = event.target as HTMLInputElement;
        this.value = (this.value ?? []).map((item, i) => 
            i === index ? { ...item, key: input.value } : item
        );
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    #onTagsChange(index: number, event: CustomEvent) {
        this.value = (this.value ?? []).map((item, i) => 
            i === index ? { ...item, tags: event.detail.value } : item
        );
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        return html`
            <div class="key-value-tags">
                ${(this.value ?? []).map((item, index) => html`
                    <div class="key-value-tags__item">
                        <uui-input
                            .value=${item.key}
                            placeholder="Enter key"
                            ?readonly=${this.readonly}
                            @change=${(e: Event) => this.#onKeyChange(index, e)}>
                        </uui-input>
                        
                        <umb-property-editor-ui-tags
                            .value=${item.tags}
                            .config=${this.config}
                            ?readonly=${this.readonly}
                            @change=${(e: CustomEvent) => this.#onTagsChange(index, e)}>
                        </umb-property-editor-ui-tags>

                        ${!this.readonly ? html`
                            <uui-button
                                compact
                                look="secondary"
                                label="Remove"
                                @click=${() => this.#onRemove(index)}>
                                <uui-icon name="remove"></uui-icon>
                            </uui-button>
                        ` : ''}
                    </div>
                `)}

                ${!this.readonly ? html`
                    <uui-button
                        look="primary"
                        label="Add item"
                        @click=${this.#onAdd}>
                        <uui-icon name="add"></uui-icon>
                        Add item
                    </uui-button>
                ` : ''}
            </div>
        `;
    }

    static styles = [
        css`
            .key-value-tags {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-space-3);
            }

            .key-value-tags__item {
                display: grid;
                grid-template-columns: 200px 1fr auto;
                gap: var(--uui-size-space-3);
                align-items: start;
            }
        `
    ];
}

export default KeyValueTagsEditorElement;

declare global {
    interface HTMLElementTagNameMap {
        'key-value-tags-editor': KeyValueTagsEditorElement;
    }
} 