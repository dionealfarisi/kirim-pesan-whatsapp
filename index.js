
    function showContacts() {
      if ('contacts' in navigator) {
        navigator.contacts.select(['name', 'tel']).then(contacts => {
          const contactList = document.createElement('div');
          contactList.id = 'contactList';
          contacts.forEach(contact => {
            const contactButton = document.createElement('button');
            contactButton.textContent = contact.name;
            contactButton.onclick = function() {
              selectContact(contact.tel, contact.name);
            };
            contactList.appendChild(contactButton);
          });
          document.body.appendChild(contactList);
        }).catch(error => {
          console.error(error);
        });
      } else {
        alert('API Kontak Navigator tidak didukung di browser ini.');
      }
    }

    function selectContactOption(option) {
      const manualInput = document.getElementById('manualInput');
      const contactList = document.getElementById('contactList');
      if(contactList) contactList.remove();

      if(option === 'contacts') {
        manualInput.style.display = 'none';
        showContacts();
      } else if(option === 'manual') {
        manualInput.style.display = 'block';
      }
    }

    function selectContact(contactTel, contactName) {
      const selectedContactInput = document.getElementById('selectedContact');
      selectedContactInput.value = contactTel;
      const selectedContactNameInput = document.getElementById('selectedContactName');
      selectedContactNameInput.value = contactName;
      const contactList = document.getElementById('contactList');
      if(contactList) contactList.remove();
    }

    function sendMessage() {
      const selectedContact = document.getElementById('selectedContact').value;
      const manualInput = document.getElementById('manualInput');
      const phoneNumber = selectedContact || (manualInput.style.display === 'block' && document.getElementById('phoneNumber').value);
      const message = encodeURIComponent(document.getElementById('message').value);

      if(phoneNumber) {
        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
      } else {
        alert('Pilih kontak atau masukkan nomor telepon.');
      }
    }