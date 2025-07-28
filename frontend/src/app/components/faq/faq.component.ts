import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqItems = [
    {
      question: "Quel est l'âge minimum pour louer un véhicule chez My loc ?",
      answer: "Pour louer un véhicule chez Tunisia Rent Car vous devez être âgé de 26 ans au moins et être titulaire du permis de conduire depuis plus de deux ans. Dans certaines catégories, il y a d'autres conditions qui seront demandées selon la demande.",
      isOpen: false
    },
    {
      question: "Dois-je disposer d'un permis international pour pouvoir louer un véhicule?",
      answer: "Non, vous pouvez louer un véhicule en présentant simplement l'original de votre permis de conduire sachant qu'en aucun cas une copie ou une attestation de perte ne pourra être acceptée.",
      isOpen: false
    },
    {
      question: "Puis-je prêter le véhicule à des amis ou de la famille?",
      answer: "Non, vous ne pouvez pas prêter ou laisser conduire le véhicule autrement que par les personnes agréées par TUNISIA CAR HIRE. L'inscription d'un second conducteur est gratuite.",
      isOpen: false
    },
    {
      question: "Puis-je me rendre à l'étranger avec le véhicule?",
      answer: "Non, le véhicule ne peut être utilisé que sur le territoire tunisien.",
      isOpen: false
    },
    {
      question: "Que se passe-t-il si mon avion arrive en retard?",
      answer: "Nous vous attendrons 24h/24 et 365 jours/an si vous avez fourni les références de votre vol lors de la réservation. Service gratuit.",
      isOpen: false
    },
    {
      question: "Puis-je récupérer le véhicule ailleurs qu'à l'aéroport?",
      answer: "Oui, sans frais dans les villes avec agence. Frais supplémentaires pour d'autres lieux.",
      isOpen: false
    },
    {
      question: "Quand dois-je payer la location?",
      answer: "Le paiement se fait sur place à la prise du véhicule.",
      isOpen: false
    },
    {
      question: "Acceptez-vous les paiements en espèces?",
      answer: "Oui, mais avec présentation d'une carte de crédit/chèque tunisien ou du montant en espèces pour la garantie.",
      isOpen: false
    },
    {
      question: "Une caution est-elle prélevée sur ma carte?",
      answer: "Non, seulement une pré-autorisation de paiement est demandée.",
      isOpen: false
    },
    {
      question: "Que vérifier avant de prendre la route?",
      answer: "Vérifiez l'état du véhicule et le niveau de carburant. Signalez toute anomalie.",
      isOpen: false
    },
    {
      question: "Le carburant est-il inclus?",
      answer: "Le véhicule est fourni avec 1/4 de réservoir. Frais de 20 dinars si niveau inférieur au retour.",
      isOpen: false
    },
    {
      question: "Quelles formalités au retour?",
      answer: "État des lieux avec un agent, restitution des clés et accessoires. Règlement des suppléments éventuels.",
      isOpen: false
    },
    {
      question: "Puis-je disposer du véhicule à toute heure?",
      answer: "Oui, avec informations du vol pour les locations aéroport.",
      isOpen: false
    },
    {
      question: "Puis-je remorquer un autre véhicule?",
      answer: "Non, c'est strictement interdit.",
      isOpen: false
    },
    {
      question: "Puis-je choisir un modèle/couleur spécifique?",
      answer: "Oui selon disponibilité. Alternatives proposées si non disponible.",
      isOpen: false
    },
    {
      question: "Quels documents présenter?",
      answer: "Pièce d'identité/passeport valide + permis de conduire valide pour tous les conducteurs.",
      isOpen: false
    },
    {
      question: "Que faire en cas de panne/accident?",
      answer: "Contacter immédiatement le numéro fourni lors de la prise en charge pour une solution rapide.",
      isOpen: false
    },
    {
      question: "Retour dans une autre agence?",
      answer: "Prévenir à la prise en charge. Frais selon distance pour locations de moins d'une semaine.",
      isOpen: false
    },
    {
      question: "Que comprend la location?",
      answer: "Kilométrage illimité, entretien, lavage, assurance RC illimitée et siège auto gratuit sur demande.",
      isOpen: false
    },
    {
      question: "Tarifs à jour?",
      answer: "Oui, tarifs indicatifs hors périodes de fête/haute saison.",
      isOpen: false
    },
    {
      question: "Comment confirmer ma réservation?",
      answer: "Email de confirmation à conserver et présenter à l'agence.",
      isOpen: false
    },
    {
      question: "Modifier une réservation confirmée?",
      answer: "Oui, contacter l'agence par téléphone/email avec les détails de modification.",
      isOpen: false
    },
    {
      question: "Qu'est-ce que la franchise?",
      answer: "Part des dommages restant à la charge du locataire.",
      isOpen: false
    },
    {
      question: "Que couvre l'assurance de base?",
      answer: "Responsabilité civile et dommages aux tiers.",
      isOpen: false
    },
    {
      question: "En cas de vol?",
      answer: "Franchise multipliée par 2.",
      isOpen: false
    },
    {
      question: "Accident non responsable?",
      answer: "Rien à payer si constat établi.",
      isOpen: false
    },
    {
      question: "Accident responsable?",
      answer: "Paiement de la franchise uniquement.",
      isOpen: false
    },
    {
      question: "Dégâts au véhicule?",
      answer: "Pneus, vitres et accessoires à la charge du locataire.",
      isOpen: false
    },
    {
      question: "Besoin d'une facture?",
      answer: "Fournie à la prise en charge, au retour ou par email sur demande.",
      isOpen: false
    }
  ];

  toggleItem(index: number): void {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
